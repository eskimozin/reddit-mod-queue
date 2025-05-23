import {Button} from '@headlessui/react'
import Spotlight from "../ui/spotlight/Spotlight.tsx";
import PropTypes from "prop-types";
import {Link} from "react-router";
import config from "../../config.js";

export default function Card({title, img, subtitle, description, action = () => {}, btnLabel = "Abrir no Reddit", link = config.links.subreddit}) {
  let ret = (
    <Spotlight>
      <div
        className="relative overflow-hidden before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:border-slate-500 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-slate-600 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100 bg-blackrounded-md text-white border border-white/10 bg-white/5 rounded-lg">
        {
          img ? (
            <div className={"relative z-15"}>
              <img src={img} className={"object-cover w-full h-[200px]"} alt={title}/>
            </div>
          ) : ""
        }
        <div className={"relative z-20 p-4 pt-5"}>
          <h2 className="block font-semibold text-xl line-clamp-2 text-ellipsis">{title || "Título não retornado"}</h2>
          <p className="text-gray-400 font-semibold mt-1 mb-0 line-clamp-2 text-ellipsis">{subtitle  || "Usuário do post não retornado"}</p>
          <p className="mt-3 mb-4 pb-1">{description}</p>
          <Button className="inline-flex items-center gap-1 rounded-[5px] bg-orange-600 border-orange-700 focus:bg-orange-700 hover:bg-orange-700 px-3 py-2 text-white/95  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless mb-1 transition-colors" onClick={
            (e) => {
              e.stopPropagation();
              e.preventDefault();
              if (e.stopImmediatePropagation) e.stopImmediatePropagation();
              if (action) action()
            }
          }>
            {btnLabel}
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFF">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
            </svg>
          </Button>
        </div>
      </div>
    </Spotlight>
  )
  
  if (!link) return ret;
  return (
    <Link to={link} {...config["default-props"]["a"]}>
      <>{ret}</>
    </Link>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.func,
  btnLabel: PropTypes.string,
}
