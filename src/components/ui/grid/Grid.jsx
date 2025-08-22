import PropTypes from "prop-types";

export default function Grid({children}) {
  return (
    <div className={"group grid h-[100%] gap-6 md:grid-cols-2 md:mx-auto lg:mx-auto lg:max-w-none lg:grid-cols-4"}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node,
}