import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AnimatedComponents from "./components/animatedComponent/AnimatedComponents.jsx";
import Arial from "./components/arial/Arial.jsx";
import Grid from './components/grid/Grid.jsx'
import Card from './components/card/Card.jsx'
import UpdateTime from './components/updateTime/UpdateTime.jsx'
import {useEffect} from "react";

const Main = () => {
  useEffect(() => {
    // Requisitar à API no banco de dados os itens pendentes de moderação, além dos dados de último post que entrou na fila
  }, [])
  
  return (
    <main className="flex align-center justify-center min-h-screen">
      <div className="container my-5 lg:my-10">
        <AnimatedComponents>
          <hgroup className={"flex items-center gap-3 mb-8"}>
            <img src={"https://styles.redditmedia.com/t5_djonfq/styles/communityIcon_so6opouwbkwe1.jpeg?format=pjpg&s=87d36ec6c490962999a51fdc8b64bf180892131a"} alt="Foto de perfil do servidor" className={"rounded-full w-[50px] h-[50px] object-cover"}/>
            <div className={"block"}>
              <h1 className={"text-balance font-bold text-3xl"}>Fila de moderação do r<Arial>/</Arial>eskimozin</h1>
              <p className={"m-0 text-gray-400 text-balance"}>Atualizado há <UpdateTime time={"2025-05-18 22:00:00-03:00"}/>. O último post entrou na fila há 5 horas.</p>
            </div>
          </hgroup>
        </AnimatedComponents>
        
        <Grid>
          <AnimatedComponents>
            {
              [{
                title: "Card title",
                subtitle: "Subtitle",
                description: "Description",
                img: "https://projetomobilidade.vercel.app/images/banner-800x600.png",
                link: "https://www.google.com",
                action: (() => {
                  alert("Actioned!")
                })
              }].map((item, index) => (
                <Card {...item} key={index}/>
              ))
            }
          </AnimatedComponents>
        </Grid>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes index element={<Main/>}>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  )
}