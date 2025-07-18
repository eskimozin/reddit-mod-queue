import React, {useContext} from "react";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/16/solid/index.js";
import {ThemeProvider as ThemeProviderModerateAll} from "./ModerateAllPostsContext.jsx";
import {ThemeProvider as ThemeProviderApp} from "../../App.jsx";

import DialogVerification from "./dialog/DialogVerification.jsx";
import DialogConfirm from "./dialog/DialogConfirm.jsx";
import DialogVerifyRequest from "./dialog/DialogVerifyRequest.jsx";

export default function ModerateAllPostsContent() {
  let {
    codeSend,
    setIsOpen,
    setAction,
    setActionTxt,
    allOk,
    setCodeSend,
    setAllOk,
    clearValues,
    setMessage
  } = useContext(ThemeProviderModerateAll);
  
  let {
    setStopAppInterval
  } = useContext(ThemeProviderApp);
  
  const items = [
    [1, "Aprovar", (() => {
    })],
    [2, "Reprovar", (() => {
    })]
  ];
  
  return (
    <div>
      {!codeSend && !allOk && <DialogConfirm/>}
      {codeSend && !allOk && <DialogVerification/>}
      {codeSend && allOk && <DialogVerifyRequest/>}
      
      <Menu>
        <MenuButton className="mt-8 inline-flex items-center focus-headless gap-2 rounded bg-gray-800 px-3 py-2  text-white  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
          Moderar todos de uma vez
          <ChevronDownIcon className="size-4 fill-white/60"/>
        </MenuButton>
        
        <MenuItems transition anchor="bottom end" className="w-52 mt-1 origin-top-right rounded border border-white/20 bg-slate-900 p-1 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
          {
            [...items].map((i, index) => {
              return (
                <MenuItem key={index} onClick={(e) => {
                  e.preventDefault();
                  setAllOk(false);
                  setCodeSend(false);
                  setIsOpen(true);
                  setAction(i[0]);
                  setActionTxt(i[1]);
                  clearValues();
                  setMessage("");
                  setStopAppInterval(true)
                }}>
                  <button className="focus-headless group flex w-full items-center gap-2 rounded px-3 py-1.5 hover:bg-white/10 data-focus:bg-white/10 focus:bg-white/10">
                    {i[1]}
                  </button>
                </MenuItem>
              )
            })
          }
        </MenuItems>
      </Menu>
    </div>
  )
}