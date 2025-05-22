import {createContext, useState} from "react";
import PropTypes from "prop-types";

const ThemeProvider = createContext(null);

function ContextMain({children}) {
  const [vUpdateTime, setVUpdateTime] = useState("");
  const [latestRegister, setLatestRegister] = useState("");
  const [postsPending, setPostsPending] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const contextValues = {
    vUpdateTime,
    setVUpdateTime,
    latestRegister,
    setLatestRegister,
    postsPending,
    setPostsPending,
    isLoading,
    setIsLoading,
    error,
    setError,
  }
  
  return (
    <ThemeProvider.Provider value={{...contextValues}}>
      {children}
    </ThemeProvider.Provider>
  );
}

ContextMain.propTypes = {
  children: PropTypes.node
}

export {ThemeProvider, ContextMain};