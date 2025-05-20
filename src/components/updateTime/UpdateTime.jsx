import PropTypes from "prop-types";
import moment from 'moment-timezone';

import {useCallback, useEffect, useState} from "react";

export default function UpdateTime({time}) {
  const momentTime = moment(time).tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ssZ');
  const [formattedTime, setFormattedTime] = useState("pouco");
  
  console.log("Time: ", momentTime);
  console.log("Now: ", moment.utc());
  console.log("Now [-03:00 UTC]: ", moment.utc().tz("America/Sao_Paulo"));
  
  const intervalFn = useCallback(() => {
    const momentNow = moment.utc().tz("America/Sao_Paulo");
    
    const [
      seconds,
      minutes,
      hours
    ] = [
      momentNow.diff(momentTime, "seconds"),
      momentNow.diff(momentTime, "minutes"),
      momentNow.diff(momentTime, "hours"),
    ]
    
    if (hours > 0) setFormattedTime(`${hours} ${hours > 1 ? "horas" : "hora"}`);
    else if (minutes > 0) setFormattedTime(`${minutes} ${minutes > 1 ? "minutos" : "minuto"}`);
    else if (seconds > 0) setFormattedTime(`${seconds} ${seconds > 1 ? "segundos" : "segundo"}`);
    else setFormattedTime("pouco");
    // console.log(seconds, minutes, hours, momentNow, momentTime);
  }, [])
  
  useEffect(() => {
    intervalFn()
  }, []);
  
  useEffect(() => {
    setInterval(intervalFn, 1000)
  }, [])
  
  return <>{formattedTime}</>
}

UpdateTime.propTypes = {
  title: PropTypes.string.isRequired,
}