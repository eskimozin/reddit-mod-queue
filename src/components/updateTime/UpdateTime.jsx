import PropTypes from "prop-types";
import moment from "moment";
import {useCallback, useEffect, useState} from "react";

export default function UpdateTime({time}) {
  const momentTime = moment(time);
  const [formattedTime, setFormattedTime] = useState("há pouco");
  
  const intervalFn = useCallback(() => {
    const momentNow = moment();
    
    useEffect(() => {
      intervalFn()
    }, []);
    
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
    else setFormattedTime("há pouco");
  }, [])
  
  setInterval(intervalFn, 1000)
  
  return <>{formattedTime}</>
}

UpdateTime.propTypes = {
  title: PropTypes.string,
}