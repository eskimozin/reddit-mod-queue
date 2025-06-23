import PropTypes from "prop-types";
import {useContext, useEffect} from "react";
import {ThemeProvider} from "./ModerateAllPostsContext.jsx";

export default function UseModerateAllPosts({children}) {
  const {codeSend, setFeedbackMessage, values, setMessage} = useContext(ThemeProvider);
  
  useEffect(() => {
    if (codeSend) setFeedbackMessage("code", values, setMessage);
  }, [values]);
  
  return (<>{children}</>);
}

UseModerateAllPosts.propTypes = {
  children: PropTypes.node,
}