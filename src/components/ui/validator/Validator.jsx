import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import moment from "moment";
import config from "../../../config.js";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import Footer from "../../footer/Footer.jsx";
import {Button} from "@headlessui/react";

export default function Validator() {
  const params = useParams();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const captchaRef = useRef(null);
  
  useEffect(() => {
    captchaRef?.current?.resetCaptcha();
  }, [])
  
  const confirmAction = async ({token, id, action, code, datetimeCreate}) => {
    const res = await fetch(`${config.modQueueServer}/api/verify-code`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token,
        id,
        action,
        code,
        datetimeCreate
      }),
    });
    
    const data = await res.json();
    // console.log(data);
    
    if (data.success) {
      console.log("OK!");
      setMessage("Tudo certo! Em instantes a solicitação será concluída. É só aguardar. Você pode fechar a página. Quando a solicitação tiver sido concluída, uma mensagem será enviada no canal de logs do Discord.");
      captchaRef.current.resetCaptcha();
    } else {
      setMessage(data.message || JSON.stringify(data));
      captchaRef.current.resetCaptcha();
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!token) {
      setMessage('Por favor, complete o captcha antes de enviar.');
      return;
    }
    
    let [id, datetimeCreate, action, code] = params.id.split('A');
    datetimeCreate = moment(datetimeCreate, "x").format("YYYY-MM-DD HH:mm:ss");
    console.log({id, datetimeCreate, action, code})
    
    confirmAction({token, id, action, code, datetimeCreate}).then(() => {
      console.log("OK!");
    });
  }
  
  return (
    <div className="flex align-center justify-center">
      <div className="container mx-3 my-8 lg:my-10 min-h-[90vh] flex justify-between flex-col">
        <div className={"max-w-[580px] mx-auto"}>
          <main className="flex justify-center flex-col gap-12 items-center">
            <h1 className={"text-balance text-center font-bold text-3xl"}>Preencha o captcha para finalizar a validação</h1>
            
            <form className="flex justify-center flex-col" onSubmit={handleSubmit}>
              <div className={"mx-auto"}>
                <HCaptcha
                  sitekey={import.meta.env.VITE_SITE_KEY}
                  onVerify={(token) => {
                    setToken(token);
                  }}
                  ref={captchaRef}
                />
              </div>
              
              {
                message && (
                  <AnimatedComponents>
                    <div className="flex flex-wrap gap-2 items-center text-center p-3 bg-orange-500/5 border border-orange-300/25 text-orange-300 mt-4 rounded">
                      <p className={"text-balance"}>{message}</p>
                    </div>
                  </AnimatedComponents>
                )
              }
              
              <div className={"mt-4 flex flex-wrap gap-2 items-center justify-center"}>
                <Button type="submit" className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless">
                  Confirmar
                </Button>
              </div>
            </form>
          </main>
        </div>
        <Footer/>
      </div>
    </div>
  )
}