import {Button} from '@headlessui/react'
import Spotlight from "../spotlight/Spotlight.tsx";
import PropTypes from "prop-types";
import {Link} from "react-router";

export default function Card({title, img, subtitle, description, action, btnLabel, link}) {
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
        <div className={"relative z-20 p-4"}>
          <h2 className="block font-semibold text-2xl">{title}</h2>
          <p className="text-gray-400 font-semibold text-lg mb-0">{subtitle}</p>
          <p className="mt-3 mb-4">{description}</p>
          <Button className="inline-flex items-center gap-2 rounded-[5px] bg-orange-500 border-orange-600 focus:bg-orange-600 hover:bg-orange-600 px-3 py-2 text-white/95  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless mb-1 transition-colors" onClick={
            (e) => {
              e.stopPropagation();
              e.stopImmediatePropagation();
              if (action) action()
            }
          }>
            {btnLabel}
          </Button>
        </div>
      </div>
    </Spotlight>
  )
  
  if (!link) return ret;
  return (
    <Link to={link} rel={"noopener noreferrer"} className={"focus-headless"}>
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
