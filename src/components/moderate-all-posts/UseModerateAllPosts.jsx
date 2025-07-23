import PropTypes from "prop-types";
import {useContext, useEffect} from "react";
import {ThemeProvider} from "./ModerateAllPostsContext.jsx";

export default function UseModerateAllPosts({children}) {
  if (!ThemeProvider || !useContext) {
    alert("O contexto \"ThemeProvider\" não é válido. Não é possível renderizar as ações.");
    return null
  } else if (!useContext(ThemeProvider)) {
    alert("O contexto \"ThemeProvider\" não é válido. Não é possível renderizar as ações.");
    return null
  }
  
  const {codeSend, setFeedbackMessage, values, setMessage} = useContext(ThemeProvider);
  
  useEffect(() => {
    if (codeSend) setFeedbackMessage("code", values, setMessage);
  }, [values]);
  
  return (<>{children}</>);
}

UseModerateAllPosts.propTypes = {
  children: PropTypes.node,
}