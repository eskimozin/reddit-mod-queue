import {useContext, useEffect} from "react";
import axios from "axios";
import config from "../../config.js";
import moment from "moment";
import {ThemeProvider} from "./ContextMain.jsx";

export default function UseMain() {
  const {
    setVUpdateTime,
    setLatestRegister,
    setPostsPending,
    setIsLoading,
    setError,
  } = useContext(ThemeProvider)
  
  useEffect(() => {
    try {
      // Requisitar à os dados de último post que entrou na fila
      const response = axios.post(`${config.host}/api/get-latest-register/`);
      
      response.then(res => {
        const {data} = res;
        if (data && data["rows"][0][0]["datetime_register"]) {
          const datetimeRegister = data["rows"][0][0]["datetime_register"];
          setLatestRegister(datetimeRegister);
        }
        setVUpdateTime(moment().format("YYYY-MM-DDTHH:mm:ssZ"));
      })
    } catch (error) {
      console.log(error);
      alert("Um erro ocorreu! " + error.message);
    }
  }, [setLatestRegister, setVUpdateTime]);
  
  useEffect(() => {
    // Requisitar à API no banco de dados os itens pendentes de moderação, além dos dados de último post que entrou na fila
    try {
      const response = axios.post(`${config.host}/api/get-unmoderates-posts/`);
      
      response.then(res => {
        const {data} = res;
        if (data && data["rows"][0].length > 0) setPostsPending(data["rows"][0])
        setVUpdateTime(moment().format("YYYY-MM-DDTHH:mm:ssZ"));
      }).catch(error => {
        console.log(error);
        // alert("Um erro ocorreu! " + error.message);
        setError(error.message);
      }).finally(() => {
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setError, setIsLoading, setPostsPending, setVUpdateTime]);
  
  return null;
}