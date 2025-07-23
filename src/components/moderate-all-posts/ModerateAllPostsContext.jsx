import PropTypes from "prop-types";
import {createContext, useCallback, useContext, useRef, useState} from "react";
import {ThemeProvider as ThemeProviderApp} from "../../App.jsx";

const ThemeProvider = createContext(null);

function ModerateAllPostsContext({children}) {
  if (!ThemeProviderApp || !useContext) {
    alert("O contexto \"ThemeProvider\" não é válido. Não é possível renderizar as ações.");
    return null
  } else if (!useContext(ThemeProviderApp)) {
    alert("O contexto \"ThemeProvider\" não é válido. Não é possível renderizar as ações.");
    return null
  }
  
  let {
    setStopAppInterval,
  } = useContext(ThemeProviderApp);
  
  const [credentials, setCredentials] = useState({});
  const inputLength = 6;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState(Array(inputLength).fill(""));
  const [codeSend, setCodeSend] = useState(false);
  const [isOpen, setVIsOpen] = useState(false);
  const captchaRef1 = useRef(null);
  const captchaRef2 = useRef(null);
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');
  const [actionTxt, setActionTxt] = useState('');
  const [idVerificationRequest, setIdVerificationRequest] = useState();
  const [allOk, setAllOk] = useState(false);
  
  // const [idVerificationRequest, setIdVerificationRequest] = useState(20);
  // const [allOk, setAllOk] = useState(true);
  
  const setIsOpen = useCallback((bool) => {
    setVIsOpen(bool);
    setStopAppInterval(false);
  }, [])
  
  const clearValues = useCallback(() => {
    setValues(Array(inputLength).fill(""))
  }, [])
  
  const setFeedbackMessage = useCallback((e, val, setter) => {
    // console.log(val)
    
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
    allOk,
    setAllOk,
    setFeedbackMessage,
    clearValues,
    idVerificationRequest,
    setIdVerificationRequest,
    credentials,
    setCredentials
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