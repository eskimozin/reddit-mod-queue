import {useEffect, useState, Suspense, lazy, createContext} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Loading from "./components/loading/Loading.jsx";

export const ThemeProvider = createContext(null);

const Main = lazy(() => import("./components/main/Main.jsx"));

export function App() {
  const [componentMain, setComponentMain] = useState(<></>);
  const [stopAppInterval, setStopAppInterval] = useState(false);
  
  const contextValues = {
    stopAppInterval,
    setStopAppInterval,
  }
  
  useEffect(() => {
    let interval;
    console.log("Stop interval:", stopAppInterval);
    if (stopAppInterval) return () => { }
    
    interval = setInterval(async () => {
      setComponentMain(<></>);
      setTimeout(() => {
        setComponentMain(<Main/>);
      }, 10);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [stopAppInterval]);
  
  useEffect(() => {
    setComponentMain(<Main/>);
  }, [])
  
  return (
    <ThemeProvider.Provider value={{...contextValues}}>
      <BrowserRouter>
        <Suspense fallback={<Loading/>}>
          <Routes index element={componentMain}>
            <Route path="/reddit-mod-queue/" element={componentMain}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider.Provider>
  )
}