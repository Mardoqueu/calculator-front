import React, { createContext, useState, useEffect } from "react";
import { AuthContextProps } from "../interfaces/AuthContextProps";
import { AuthProviderProps } from "../interfaces/AuthProviderProps";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("userToken")
  );

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
