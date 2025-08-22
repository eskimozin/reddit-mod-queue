import moment from "moment";
import config from "../../config.js";
import Arial from "../ui/arial/Arial.jsx";
import {useEffect, useState} from "react";
import Util from "../../assets/Util.jsx";

export default function Footer() {
  const styles = {fontFamily: '"Inter Tight", "Inter", sans-serif', letterSpacing: "-0.25px"};
  const [dataBuild, setDataBuild] = useState({datetimeCreate: null});
  
  useEffect(() => {
    fetch("./register.build.json").then((response) => {
      return response.json();
    }).then((json) => {
      setDataBuild({...json});
    })
  }, []);
  
  return (
    <div className={"container text-center pt-8 lg:pt-10 mt-8 lg:mt-10 border-t border-slate-800"} {...styles}>
      <div className={"text-gray-400"}>
        <div className={"flex items-center justify-center gap-1 text-decoration-none"} style={{...styles, color: "inherit"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-c-circle" viewBox="0 0 16 16">
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512"/>
          </svg>
          <span>{moment().utc().format("YYYY")} - </span>
          <span>Fila de moderação do r<Arial>/</Arial>{config["ui-infos"]["subreddit-name"]}</span>
        </div>
        <a href={config.links.developer} className={"focus-headless"} style={{...styles, color: "inherit"}}>
          <div className={"flex items-center justify-center gap-1 text-decoration-none"}>
            <span>Feito com 💖 pelo {config["ui-infos"]["developer-name"]}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
            </svg>
          </div>
        </a>
        {dataBuild.datetimeCreate && <span className={"block text-[13px] mt-2 text-white"}>Versão de build: {Util.renderText(moment(dataBuild.datetimeCreate).utc(true).format("HH[h]mm[m] DD/MM/YYYY [GMT-03:00]"))}</span>}
      </div>
    </div>
  )
}
