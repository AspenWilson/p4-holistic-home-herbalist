import { createContext, useState } from "react";

const LoadingContext = createContext(true)

const LoadingProvider = ({ children }) => {
  const [ loading, setLoading ] = useState(true)

  return <LoadingContext.Provider value={{ loading, setLoading }}>{ children }</LoadingContext.Provider>
}

export { LoadingContext, LoadingProvider }