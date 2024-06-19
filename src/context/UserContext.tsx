import React, { createContext, useContext, useState, useEffect } from "react";
import { FormValues } from "../app/login/page";
import useLocalStorage from "../app/hooks/useLocalStorage";

interface UserContextData {
  username: string;
  jobTitle: string;
}

interface AppContextProps {
  userContextData: FormValues;
  setUserContextData: React.Dispatch<React.SetStateAction<FormValues>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AppProvider");
  }
  return context;
};

export const UserContextDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // initalise the user context data with the data from local storage
  const [userContextData, setUserContextData] =
    useLocalStorage<UserContextData>("userContextData", {
      username: "",
      jobTitle: "",
    });

  return (
    <AppContext.Provider value={{ userContextData, setUserContextData }}>
      {children}
    </AppContext.Provider>
  );
};
