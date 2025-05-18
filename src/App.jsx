import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AnimatedComponents from "./components/animatedComponent/AnimatedComponents.jsx";
import Arial from "./components/arial/Arial.jsx";
import Grid from './components/grid/Grid.jsx'
import Card from './components/card/Card.jsx'

const Main = () => {
  return (
    <main className="flex align-center justify-center min-h-screen">
      <div className="container my-5 lg:my-10">
        <AnimatedComponents>
          <hgroup className={"flex align-center gap-3 mb-8"}>
            <img src={"#"} alt="Foto de perfil do servidor" className={"rounded-full"}/>
            <div className={"block"}>
              <h1 className={"text-balance font-semibold text-3xl"}>Fila de moderação do r<Arial>/</Arial>eskimozin</h1>
              <p className={"m-0 text-gray-300 text-balance"}>Atualizada há 1 minuto. O último post entrou na fila há 5 horas.</p>
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
                btnLabel: "Go to the app",
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