import PropTypes from "prop-types";
import moment from 'moment';
import {useCallback, useEffect, useState} from "react";

export default function UpdateTime({time}) {
  // Força a interpretação do `time` como UTC-3 (ex: São Paulo)
  function toSaoPauloISOString(input) {
    const date = new Date(input);
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(date);
    const get = (type) => parts.find(p => p.type === type)?.value;
    
    // Retorna uma string ISO sem fuso explícito, mas com os dados ajustados
    return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
  }
  
  
  // console.log(toSaoPauloISOString(new Date(time)))
  const momentTime = moment(toSaoPauloISOString(new Date(time)));
  
  const [formattedTime, setFormattedTime] = useState("pouco");
  
  const intervalFn = useCallback(() => {
    const momentNow = moment(toSaoPauloISOString(new Date()));
    
    const seconds = momentNow.diff(momentTime, "seconds");
    let minutes = momentNow.diff(momentTime, "minutes");
    let hours = momentNow.diff(momentTime, "hours");
    let days = momentNow.diff(momentTime, "days");
    
    // Implementação para forçar a apresentação de horário correto em produção
    hours = window.location.hostname === "localhost" ? hours : hours - 3;
    
    // Se os minutos forem maior ou igual a 180 será subtraído 180 minutos (60 * 3), pois no caso de UTC ser 0, o horário estaria 3 horas a frente
    minutes = window.location.hostname !== "localhost" && minutes >= 180 ? minutes - (60 * 3) : minutes;
    
    // Se o horário for menor que 4 horas, os minutos serão exibidos e a hora não. Para corrigir isso, no ambiente de produção, é feita a divisão dos minutos por 60, resultando na quantidade de horas
    // As horas então, são apresentadas, ao invés dos minutos
    hours = window.location.hostname !== "localhost" && minutes >= 60 && hours < 4 ? Math.floor(minutes / 60) : hours
    
    // console.log(seconds, minutes, hours, momentTime.diff(momentTime, "hours"), momentTime.diff(momentTime, "minutes"));
    
    if (hours > 24) setFormattedTime(`${days} ${days > 1 ? "dias" : "dia"}`);
    else if (hours > 0) setFormattedTime(`${hours} ${hours > 1 ? "horas" : "hora"}`);
    else if (minutes > 0) setFormattedTime(`${minutes} ${minutes > 1 ? "minutos" : "minuto"}`);
    else if (seconds > 0) setFormattedTime(`${seconds} ${seconds > 1 ? "segundos" : "segundo"}`);
    else setFormattedTime("pouco");
  }, [momentTime]);
  
  useEffect(() => {
    intervalFn();
    const interval = setInterval(intervalFn, 1000);
    return () => clearInterval(interval);
  }, [intervalFn]);
  
  return <>{formattedTime}</>
}

UpdateTime.propTypes = {
  time: PropTypes.string.isRequired,
};
