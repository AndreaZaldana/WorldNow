import { createContext, useState } from "react";

export const lanContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(null);
  
    return (
      <lanContext.Provider value={{ lang, setLang }}>
        {children}
      </lanContext.Provider>
    );
  };