import PropTypes from "prop-types";

export default function Grid({children}) {
  return (
    <div className={"group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-4"}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node,
}