import { createContext, useState } from "react";

export const PcdFilePropsContext = createContext({});
export const PcdFilePropsProvider = (props) => {
  const { children } = props;

  const [pcdData, setPcdData] = useState('');

  return (
    <PcdFilePropsContext.Provider value={{pcdData, setPcdData}}>
      {children}
    </PcdFilePropsContext.Provider>
  )
}