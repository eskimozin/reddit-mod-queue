import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AnimatedComponents from "./components/animatedComponent/AnimatedComponents.jsx";
import Arial from "./components/arial/Arial.jsx";
import Grid from './components/grid/Grid.jsx'
import Card from './components/card/Card.jsx'
import UpdateTime from './components/updateTime/UpdateTime.jsx'
import {useEffect, useState} from "react";
import axios from "axios";
import config from "./config.js";
import moment from "moment";
import Alert from "./components/alert/Alert.jsx";

const Main = () => {
  const [vUpdateTime, setVUpdateTime] = useState("");
  const [latestRegister, setLatestRegister] = useState("");
  const [postsPending, setPostsPending] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
  }, []);
  
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
  }, []);
  
  return (
    <main className="flex align-center justify-center min-h-screen">
      <div className="container mx-3 my-8 lg:my-10">
        <AnimatedComponents>
          <hgroup className={"flex items-center gap-4 mb-8 flex-wrap"}>
            <img src={"https://styles.redditmedia.com/t5_djonfq/styles/communityIcon_so6opouwbkwe1.jpeg?format=pjpg&s=87d36ec6c490962999a51fdc8b64bf180892131a"} alt="Foto de perfil do servidor" className={"rounded-full w-[50px] h-[50px] object-cover"}/>
            <div className={"block"}>
              <h1 className={"text-balance font-bold text-3xl"}>Fila de moderação do <span className={"text-orange-600"}>r<Arial>/</Arial>eskimozin</span></h1>
              <p className={"mb-0 mt-1 text-gray-400 text-balance max-w-[600px] text-balance"}>Atualizado há {vUpdateTime ? <UpdateTime time={vUpdateTime}/> : "pouco"}. O último post entrou na fila de moderação há {latestRegister ? <UpdateTime time={latestRegister}/> : "pouco"}. A verificação da fila de moderação é feita a cada 5 minutos.</p>
            </div>
          </hgroup>
        </AnimatedComponents>
        
        <Grid>
          <AnimatedComponents>
            {
              isLoading && !postsPending ? (
                <Card
                  title="Carregando..."
                  subtitle={"Conectando à API, aguarde"}
                  description={"Geralmente isso é rápido mas pode ser que demore um pouco."}
                  link={"https://reddit.com/r/eskimozin"}
                  btnLabel={"Ir pro subreddit"}
                  action={() => {
                  }}
                />
              ) : postsPending ? postsPending.map((post, index) => {
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
              }) : !error ? <Card title={"Não há nada por aqui..."} subtitle={"Tudo certo!"} description={"Sem posts para a moderação avaliar. Pegue uma bebida e aguarde."} btnLabel={"Ir pro subreddit"}/> : <Card title={"Ocorreu um erro: " + error} subtitle={"Algo não saiu como deveria..."} description={""} link={"https://github.com/eskimozin/reddit-mod-queue/issues/new"} btnLabel={"Reportar"}/>
            }
          </AnimatedComponents>
        </Grid>
        
        {
          postsPending && postsPending.length >= 10 && (
            <AnimatedComponents>
              <Alert>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#94A3B8" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                </svg>
                <span>Listamos apenas os 10 últimos posts pendentes de moderação.</span>
              </Alert>
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
      setTimeout(() => {
        setComponentMain(<Main/>)
      }, 10)
    }, (5 * 60 * 1000));
    
    return () => {
      clearInterval(interval);
    }
  }, [])
  
  return (
    <BrowserRouter>
      <Routes index element={componentMain}>
        <Route path="/reddit-mod-queue/" element={componentMain}/>
      </Routes>
    </BrowserRouter>
  )
}