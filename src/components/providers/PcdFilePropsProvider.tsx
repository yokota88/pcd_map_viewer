import { createContext, useState } from "react";

export type PcdInfo = {
  file: string;
  max_height: number;
  min_height: number;
}

export type ContextType = {
  pcdProps: PcdInfo;
  setPcdProps: React.Dispatch<React.SetStateAction<PcdInfo>>;
};

export const defaultContext: ContextType= {
  pcdProps: {file: '', max_height: 1, min_height: 0},
  setPcdProps: () => {},
};

export const PcdFilePropsContext = createContext<ContextType>(defaultContext);

export const PcdFilePropsProvider = (props: any) => {
  const { children } = props;
  const [pcdProps, setPcdProps] = useState({file: '', max_height: 1, min_height: 0})
  
  return (
    <PcdFilePropsContext.Provider value={{pcdProps, setPcdProps}}>
      {children}
    </PcdFilePropsContext.Provider>
  )
}