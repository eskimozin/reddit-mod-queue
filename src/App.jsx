import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AnimatedComponents from "./components/animatedComponent/AnimatedComponents.jsx";
import Arial from "./components/arial/Arial.jsx";
import Grid from './components/grid/Grid.jsx'
import Card from './components/card/Card.jsx'
import UpdateTime from './components/updateTime/UpdateTime.jsx'
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import config from "./config.js";
import moment from "moment";

const Main = () => {
  const [vUpdateTime, setVUpdateTime] = useState("");
  const [latestRegister, setLatestRegister] = useState("");
  const [postsPending, setPostsPending] = useState(null);
  
  useEffect(() => {
    try {
      // Requisitar à API no banco de dados os itens pendentes de moderação, além dos dados de último post que entrou na fila
      const response = axios.post(`${config.host}/api/get-latest-register/`);
      
      response.then(res => {
        const {data} = res;
        if (data && data["rows"][0][0]["datetime_register"]) {
          const datetimeRegister = data["rows"][0][0]["datetime_register"];
          setLatestRegister(datetimeRegister);
        }
        setVUpdateTime(moment().format("YYYY-MM-DDTHH:mm:ssZ"));
      });
    } catch (error) {
      console.log(error);
      alert("Um erro ocorreu! " + error.message);
    }
  }, []);
  
  useEffect(() => {
    // Requisitar à API no banco de dados os itens pendentes de moderação, além dos dados de último post que entrou na fila
    try {
      const response = axios.post(`${config.host}/api/get-unmoderates-posts/`);
      
      response.then(res => {
        const {data} = res;
        if (data && data["rows"][0].length > 0) setPostsPending(data["rows"][0])
        setVUpdateTime(moment().format("YYYY-MM-DDTHH:mm:ssZ"));
      });
    } catch (error) {
      console.log(error);
      alert("Um erro ocorreu! " + error.message);
    }
  }, []);
  
  return (
    <main className="flex align-center justify-center min-h-screen">
      <div className="container my-5 lg:my-10">
        <AnimatedComponents>
          <hgroup className={"flex items-center gap-3 mb-8"}>
            <img src={"https://styles.redditmedia.com/t5_djonfq/styles/communityIcon_so6opouwbkwe1.jpeg?format=pjpg&s=87d36ec6c490962999a51fdc8b64bf180892131a"} alt="Foto de perfil do servidor" className={"rounded-full w-[50px] h-[50px] object-cover"}/>
            <div className={"block"}>
              <h1 className={"text-balance font-bold text-3xl"}>Fila de moderação do r<Arial>/</Arial>eskimozin</h1>
              <p className={"m-0 text-gray-400 text-balance"}>Atualizado há {vUpdateTime ? <UpdateTime time={vUpdateTime}/> : "pouco"}. O último post entrou na fila há {latestRegister ? <UpdateTime time={latestRegister}/> : "pouco"}. A verificação com a API do Reddit é feita a cada 5 minutos.</p>
            </div>
          </hgroup>
        </AnimatedComponents>
        
        <Grid>
          <AnimatedComponents>
            {
              postsPending ? postsPending.map((post, index) => {
                const props = {
                  title: post["post_title"],
                  subtitle: post["post_author_name"],
                  description: "",
                  img: post["post_img_url"],
                  link: post["reddit_link"],
                  action: (() => {
                    window.open(post["reddit_link"], "_blank", "noreferrer noopener");
                  })
                }
                
                return <Card {...props} key={index}/>
              }) : <Card title={"Não há nada por aqui..."} subtitle={"Tudo certo!"} description={"Sem posts para a moderação avaliar. Pegue uma bebida e aguarde."} link={"https://reddit.com/r/eskimozin"} btnLabel={"Ir pro subreddit"} action={() => {
              }}/>
            }
          </AnimatedComponents>
        </Grid>
        
        {
          postsPending && postsPending.length >= 10 && (
            <AnimatedComponents>
              <div className={"bg-slate-800 border border-white/10 rounded-md p-3 mt-5 text-slate-400 items-center gap-2 inline-flex"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#94A3B8" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                </svg>
                Listamos apenas os 10 últimos posts pendentes de moderação.
              </div>
            </AnimatedComponents>
          )
        }
      </div>
    </main>
  )
}

export default function App() {
  const [componentMain, setComponentMain] = useState(<></>);
  
  useEffect(() => {
    setComponentMain(<Main/>)
    
    const interval = setInterval(() => {
      setComponentMain(<></>)
      setComponentMain(<Main/>)
    }, (5 * 60 * 1000));
    
    return () => {
      clearInterval(interval);
    }
  }, [])
  
  return (
    <BrowserRouter>
      <Routes index element={componentMain}>
        <Route path="/" element={componentMain}/>
      </Routes>
    </BrowserRouter>
  )
}