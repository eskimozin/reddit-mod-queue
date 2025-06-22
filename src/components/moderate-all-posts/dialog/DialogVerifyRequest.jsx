import config from "../../../config.js";
import AnimatedComponents from "../../ui/animatedComponent/AnimatedComponents.jsx";
import {Button, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import React, {useContext, useEffect, useState} from "react";
import {ThemeProvider as ThemeProviderModerateAll} from "../ModerateAllPostsContext.jsx";
import {ThemeProvider as ThemeProviderApp} from "../../../App.jsx";

export default function DialogVerifyRequest() {
  const [statusRequest, setStatusRequest] = useState("Em instantes a solicitação será concluída. Aguarde...");
  const [stopVerifyInterval, setstopVerifyInterval] = useState(false);
  
  const {
    isOpen,
    setIsOpen,
    message,
    idVerificationRequest,
  } = useContext(ThemeProviderModerateAll)
  
  let {
    setStopAppInterval
  } = useContext(ThemeProviderApp);
  
  const request = async (id) => {
    const res = await fetch(`${config.hCaptchaHost}/api/verify-request`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
      }),
    });
    
    return await res.json();
  }
  
  useEffect(() => {
    let interval;
    
    if (stopVerifyInterval) {
      setStopAppInterval(false);
      return () => {}
    }
    
    interval = setInterval(async () => {
      if (!idVerificationRequest) return;
      const res = await request(idVerificationRequest);
      
      if (res.success) {
        // console.log(res);
        switch (parseInt(res.status)) {
          case 2:
            setStatusRequest("Em instantes a solicitação será concluída. Aguarde...");
            break;
          case 3:
            setStatusRequest("Solicitação executada com sucesso");
            setstopVerifyInterval(true);
            break;
          default:
            setStatusRequest("Status da execução não mapeado");
            break;
        }
      }
    }, 1000)
    
    return () => {
      setStopAppInterval(false);
      clearInterval(interval);
    }
  }, [stopVerifyInterval]);
  
  return (
    <Dialog open={isOpen} as="div" className="relative z-30 focus:outline-none" onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70 backdrop-blur-md">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="font-semibold text-[1.55rem]">
              Solicitação enviada
            </DialogTitle>
            
            <p className="mt-4 my-6 text-white/70">
              {statusRequest}
            </p>
            
            {
              message && (
                <AnimatedComponents>
                  <div className="flex flex-wrap gap-2 items-center text-center p-3 bg-orange-500/5 border border-orange-300/25 text-orange-300 mt-4 rounded">
                    <p className={"text-balance"}>{message}</p>
                  </div>
                </AnimatedComponents>
              )
            }
            
            <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
              <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless" onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}>
                Fechar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}