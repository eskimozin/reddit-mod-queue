import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/16/solid'

import {Button, Dialog, DialogPanel, DialogTitle} from '@headlessui/react'
import React, {useEffect, useRef, useState} from 'react'
import CodeInput from "../code-input/CodeInput.js";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import config from "../../config.js";
import AnimatedComponents from "../ui/animatedComponent/AnimatedComponents.jsx";

const setFeebackMessage = (e, val, setter) => {
  const action = [
    {e: "code", func: val.filter(v => v.trim().length === 0).length === 0, ok: "", incomplete: 'Preencha todos os números do código'}
  ]
  
  const ref = action.filter(a => a.e === e).at(0);
  
  if (!ref.func) setter(ref.incomplete)
  else setter(ref.ok)
}

export default function ModerateAllPosts() {
  const inputLength = 6;
  const [values, setValues] = useState(Array(inputLength).fill(""));
  
  let [isOpen, setIsOpen] = useState(true);
  const captchaRef = useRef(null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');
  
  useEffect(() => {
    setFeebackMessage("code", values, setMessage);
  }, [values]);
  
  const onVerify = (token) => {
    setToken(token);
  };
  
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
      const res = await fetch(`${config.hCaptchaHost}/api/verify-captcha`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token}),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Captcha validado com sucesso!
        // Tem que ir na API e verificar se o código digitado está correto
        console.log("OK!")
      } else {
        setMessage('Falha na validação do captcha, tente novamente.');
        captchaRef.current.resetCaptcha();
        setToken(null);
      }
    } catch (error) {
      setMessage('Erro ao validar captcha.');
    }
  };
  
  return (
    <div>
      <Menu>
        <MenuButton className="mt-8 inline-flex items-center focus-headless gap-2 rounded bg-gray-800 px-3 py-2  text-white  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
          Moderar todos de uma vez
          <ChevronDownIcon className="size-4 fill-white/60"/>
        </MenuButton>
        
        <MenuItems transition anchor="bottom end" className="w-52 mt-1 origin-top-right rounded border border-white/20 bg-slate-900 p-1 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
          {
            [
              ["Aprovar", (() => {
              })],
              ["Reprovar", (() => {
              })]
            ].map((i, index) => {
              return (
                <MenuItem key={index} onClick={(e) => {
                  setIsOpen(true);
                  setAction(i[0]);
                  
                  // Vai na API e solicita a criação de uma ação de moderação. A API vai criar o código, registrar e enviar via webhook
                  // TODO - apenas quando tiver retornado o OK da API que o modal deve aparecer para preencher com o código. Enquanto isso, dar feedback para o usuário do que está sendo feito
                  
                  console.log(i[1]);
                  // i[1]();
                }}>
                  <button className="focus-headless group flex w-full items-center gap-2 rounded px-3 py-1.5 hover:bg-white/10 data-focus:bg-white/10 focus:bg-white/10">
                    {i[0]}
                  </button>
                </MenuItem>
              )
            })
          }
        </MenuItems>
      </Menu>
      
      <Dialog open={isOpen} as="div" className="relative z-30 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70 backdrop-blur-md">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="font-semibold text-[1.55rem]">
                Confirmar {["aprovar", "reprovar"].includes(action.toLowerCase()) ? action.toLowerCase() === "aprovar" ? "aprovação dos posts" : "reprovação dos posts" : "ação"}
              </DialogTitle>
              <p className="mt-2 text-white/70">
                Enviamos um código para o canal de logs do servidor no Discord. Informe abaixo e confirme. Se o código expirar, reinicie a solicitação.
              </p>
              
              <form action={"#"} method={"POST"} onSubmit={handleSubmit}>
                <CodeInput inputLength={6} values={values} setValues={setValues}/>
                
                <div className={"mt-5 flex items-center justify-center"}>
                  <HCaptcha
                    sitekey={import.meta.env.VITE_SITE_KEY}
                    onVerify={onVerify}
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
                
                <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
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
    </div>
  )
}
