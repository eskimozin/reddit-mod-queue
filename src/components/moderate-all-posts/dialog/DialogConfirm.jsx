import {Button, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import AnimatedComponents from "../../ui/animatedComponent/AnimatedComponents.jsx";
import React, {useContext, useEffect, useState} from "react";
import {ThemeProvider} from "../ModerateAllPostsContext.jsx";
import config from "../../../config.js";

export default function DialogConfirm() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState('');
  
  const {
    setCodeSend,
    isOpen,
    setIsOpen,
    captchaRef1,
    action,
    setCredentials,
    isLoading,
    setIsLoading,
  } = useContext(ThemeProvider)
  
  useEffect(() => {
    captchaRef1?.current?.resetCaptcha();
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    
    if (!token) {
      setMessage('Por favor, complete o captcha antes de enviar.');
      return;
    }
    
    // Enviar o token para o backend para validação
    try {
      setIsLoading(true);
      
      const res = await fetch(`${config.modQueueServer}/api/new-action`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token,
          id: new Date().getTime(),
          action,
        }),
      });
      
      const data = await res.json();
      console.log(data);
      
      if (data.success) {
        setCredentials(data.credentials);
        setMessage("");
        setCodeSend(true);
        captchaRef1.current.resetCaptcha();
      } else {
        setMessage(data.message || JSON.stringify(data));
        captchaRef1.current.resetCaptcha();
        setToken("");
      }
    } catch (error) {
      setMessage('Erro ao validar captcha.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} as="div" className="relative z-30 focus:outline-none" onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70 backdrop-blur-md">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel transition className="w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
            <DialogTitle as="h3" className="font-semibold text-[1.55rem]">
              Preencha o Captcha
            </DialogTitle>
            
            <p className="mt-2 text-white/70">
              Após preencher o Captcha e confirmarmos que está tudo certo, enviaremos o código de verificação para o canal de logs Discord.
            </p>
            
            <form action={"#"} method={"POST"} onSubmit={handleSubmit}>
              <div className={"mt-5 flex items-center justify-center"}>
                <HCaptcha
                  sitekey={import.meta.env.VITE_SITE_KEY}
                  onVerify={(token) => {
                    setToken(token);
                  }}
                  ref={captchaRef1}
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
              
              <div className={"mt-4 flex flex-wrap gap-2 items-center justify-center " + (isLoading ? "pointer-events-none opacity-55 cursor-not-allowed" : "")}>
                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless" onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}>
                  Cancelar
                </Button>
                
                <Button type="submit" className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless">
                  Confirmar
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}