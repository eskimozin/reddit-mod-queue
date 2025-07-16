import {Button, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import CodeInput from "../../code-input/CodeInput.tsx";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import AnimatedComponents from "../../ui/animatedComponent/AnimatedComponents.jsx";
import React, {useContext, useEffect, useState} from "react";
import {ThemeProvider} from "../ModerateAllPostsContext.jsx";
import config from "../../../config.js";
import moment from "moment";
import Util from "../../../assets/Util.jsx";

export default function DialogVerification() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState('');
  
  const {
    isLoading,
    setIsLoading,
    values,
    setValues,
    isOpen,
    setIsOpen,
    captchaRef2,
    action,
    actionTxt,
    credentials,
    setAllOk,
    setFeedbackMessage,
    setIdVerificationRequest,
  } = useContext(ThemeProvider)
  
  useEffect(() => {
    // console.log("Dialog Verification", " ", "Rendered: ", new Date());
    captchaRef2?.current?.resetCaptcha();
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    
    if (!token) {
      setMessage('Por favor, complete o captcha antes de enviar.');
      return;
    } else if (!setFeedbackMessage("code", values, setMessage)) {
      console.log("Nem todos os nrs não foram preenchidos")
      // Nem todos os nrs não foram preenchidos
      return;
    }
    
    // Enviar o token para o backend para validação
    try {
      setIsLoading(true);
      
      const res = await fetch(`${config.modQueueServer}/api/verify-code`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token,
          id: credentials["id"],
          action,
          code: values.join(""),
          datetimeCreate: credentials["datetimeCreate"]
        }),
      });
      
      const data = await res.json();
      // console.log(data);
      
      if (data.success) {
        console.log("OK!");
        setMessage("");
        setAllOk(true);
        setIdVerificationRequest(data.id);
        captchaRef2.current.resetCaptcha();
      } else {
        setMessage(data.message || JSON.stringify(data));
        captchaRef2.current.resetCaptcha();
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
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="font-semibold text-[1.55rem]">
              Confirmar {["aprovar", "reprovar"].includes(actionTxt.toLowerCase()) ? actionTxt.toLowerCase() === "aprovar" ? "aprovação dos posts" : "reprovação dos posts" : "ação"}
            </DialogTitle>
            <p className="mt-2 text-white/70">
              Enviamos um código para o canal de logs do servidor no Discord. Informe abaixo e confirme. Se o código expirar, reinicie a solicitação. Ele é válido até {credentials["datetimeCreate"] ? Util.renderText(moment(credentials["datetimeCreate"]).utc(true).add(5, "m").format("DD/MM/YYYY [às] HH:mm:ss [UTC]Z")) : "(validade do código não obtida)"}.
            </p>
            
            <form action={"#"} method={"POST"} onSubmit={handleSubmit}>
              <CodeInput inputLength={6} values={values} setValues={setValues}/>
              
              <div className={"mt-5 flex items-center justify-center"}>
                <HCaptcha
                  sitekey={import.meta.env.VITE_SITE_KEY}
                  onVerify={(token) => setToken(token)}
                  ref={captchaRef2}
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