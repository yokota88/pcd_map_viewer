import { createContext, useState } from "react";

export type PcdInfo = {
  file: string;
  max_height: number;
  min_height: number;
  current_min_height: number;
  current_max_height: number;
}

export type ContextType = {
  pcdProps: PcdInfo;
  setPcdProps: React.Dispatch<React.SetStateAction<PcdInfo>>;
};

export const defaultContext: ContextType= {
  pcdProps: {file: '', min_height: 0, max_height: 1, current_min_height:0, current_max_height:1},
  setPcdProps: () => {},
};

export const PcdFilePropsContext = createContext<ContextType>(defaultContext);

export const PcdFilePropsProvider = (props: any) => {
  const { children } = props;
  const [pcdProps, setPcdProps] = useState({file: '', min_height: 0, max_height: 1, current_min_height:0, current_max_height:1})
  
  return (
    <PcdFilePropsContext.Provider value={{pcdProps, setPcdProps}}>
      {children}
    </PcdFilePropsContext.Provider>
  )
}