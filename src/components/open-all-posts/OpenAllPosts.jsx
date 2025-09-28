import {Button} from "@headlessui/react";
import React, {useContext} from "react";
import {ThemeProvider} from "../main/ContextMain.jsx";

export default function OpenAllPosts() {
  const {postsPending} = useContext(ThemeProvider);
  
  return (
    <Button type="button" onClick={() => {
      if (confirm("Os posts serão abertos em novas guias. Provavelmente o navegador vai pedir permissão para que esta página possa abrir outras páginas. Você precisa autorizar para que funcione corretamente.")) {
        postsPending.toReversed().toSpliced(50).forEach((post, index) => {
          setTimeout(() => {
            window.open(post?.["reddit_link"], "_blank", "noopener noreferrer");
          }, 100 * (index + 1))
        })
      }
    }} className="inline-block items-center gap-2 rounded-md bg-slate-800 px-3 py-1.5 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless">
      {postsPending.length <= 10 ? "Abrir todos os posts em novas guias" : `Abrir os ${postsPending.length <= 50 ? postsPending.length : "primeiros 50"} posts da lista em novas guias`}
    </Button>
  )
}