import {createContext, useCallback, useRef, useState} from "react";
import PropTypes from "prop-types";

const ThemeProvider = createContext(null);

function ModerateAllPostsContext({children}) {
  const inputLength = 6;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState(Array(inputLength).fill(""));
  const [codeSend, setCodeSend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const captchaRef1 = useRef(null);
  const captchaRef2 = useRef(null);
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');
  const [actionTxt, setActionTxt] = useState('');
  const [credentials, setCredentials] = useState({});
  const [allOk, setAllOk] = useState(false);
  
  const clearValues = useCallback(() => {
    setValues(Array(inputLength).fill(""))
  }, [])
  
  const setFeedbackMessage = useCallback((e, val, setter) => {
    const action = [
      {e: "code", func: val.filter(v => v.trim().length === 0).length === 0, ok: "", incomplete: 'Preencha todos os números do código'}
    ]
    
    const ref = action.filter(a => a.e === e).at(0);
    
    if (!ref.func) setter(ref.incomplete)
    else setter(ref.ok)
    
    return ref.func
  }, []);
  
  const contextValues = {
    isLoading,
    setIsLoading,
    error,
    setError,
    values,
    setValues,
    codeSend,
    setCodeSend,
    isOpen,
    setIsOpen,
    captchaRef1,
    captchaRef2,
    message,
    setMessage,
    action,
    setAction,
    actionTxt,
    setActionTxt,
    credentials,
    setCredentials,
    allOk,
    setAllOk,
    setFeedbackMessage,
    clearValues,
  }
  
  return (
    <ThemeProvider.Provider value={{...contextValues}}>
      {children}
    </ThemeProvider.Provider>
  );
}

ModerateAllPostsContext.propTypes = {
  children: PropTypes.node
}

export {ThemeProvider, ModerateAllPostsContext};