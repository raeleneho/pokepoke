import React, { createContext, useContext, useState, useEffect } from "react";
import { FormValues } from "../app/login/page";
import useLocalStorage from "../app/hooks/useLocalStorage";

interface FormData {
  username: string;
  jobTitle: string;
}

interface AppContextProps {
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useFormDataContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useFormDataContext must be used within an AppProvider");
  }
  return context;
};

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useLocalStorage<FormData>("formData", {
    username: "",
    jobTitle: "",
  });

  return (
    <AppContext.Provider value={{ formData, setFormData }}>
      {children}
    </AppContext.Provider>
  );
};
