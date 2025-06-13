import {useEffect, useState, Suspense, lazy} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Loading from "./components/loading/Loading.jsx";
const Main = lazy(() => import("./components/main/Main.jsx"));

export default function App() {
  const [componentMain, setComponentMain] = useState(<></>);
  
  useEffect(() => {
    setComponentMain(<Main/>)
    
    // const interval = setInterval(() => {
    //   setComponentMain(<></>)
    //   setTimeout(() => {
    //     setComponentMain(<Main/>)
    //   }, 10)
    // }, (5 * 60 * 1000));
    //
    // return () => {
    //   clearInterval(interval);
    // }
  }, [])
  
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
      <Routes index element={componentMain}>
        <Route path="/reddit-mod-queue/" element={componentMain}/>
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}