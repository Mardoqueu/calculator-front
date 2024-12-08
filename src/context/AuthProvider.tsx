import React, { createContext, useState, useEffect } from "react";
import { AuthContextProps } from "../interfaces/AuthContextProps";
import { AuthProviderProps } from "../interfaces/AuthProviderProps";

/**
 * `AuthContext` is a React Context object used for managing authentication
 * states throughout a component tree. It provides a centralized place to
 * store authentication-related data and makes it accessible to any nested
 * components that need access to authentication information, such as
 * the current user or authentication status.
 *
 * This context is initialized with an undefined value, and it is
 * expected to be provided with values matching the `AuthContextProps`
 * type, potentially including user details, signin/signout functions,
 * etc., based on the application's authentication implementation.
 *
 * To use `AuthContext`, wrap your component tree with an `AuthContext.Provider`
 * that supplies a suitable value. Components can subscribe to this context
 * using `useContext(AuthContext)` to access or modify authentication data.
 */
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

/**
 * AuthProvider is a React functional component that manages user authentication state.
 * It provides an authentication context to its child components, allowing them to access
 * and update the user's authentication token.
 *
 * The component maintains the `userToken` state, which holds the authentication token
 * retrieved from or stored in the local storage. It synchronizes the token with the
 * local storage whenever the token changes.
 *
 * Props:
 * - children: React.ReactNode
 *   The child components that will have access to the authentication context.
 *
 * The context provided includes:
 * - userToken: string | null
 *   Represents the current user's authentication token stored in the local storage.
 * - setUserToken: React.Dispatch<React.SetStateAction<string | null>>
 *   A function to update the user's authentication token.
 */
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
