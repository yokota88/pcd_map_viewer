import { createContext, useState } from "react";

export const PcdFilePropsContext = createContext({});
export const PcdFilePropsProvider = (props) => {
  const { children } = props;

  const [pcdFilePath, setPcdFilePath] = useState('');

  return (
    <PcdFilePropsContext.Provider value={{pcdFilePath, setPcdFilePath}}>
      {children}
    </PcdFilePropsContext.Provider>
  )
}