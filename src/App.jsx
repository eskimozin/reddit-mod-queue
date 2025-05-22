import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {useEffect, useState} from "react";
import Main from "./components/main/Main.jsx";

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