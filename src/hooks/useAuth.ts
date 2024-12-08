import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AuthContextProps } from "../interfaces/AuthContextProps";

/**
 * Custom hook `useAuth`.
 *
 * This hook provides access to the authentication context, allowing
 * components to access and respond to authentication state and actions.
 *
 * @returns {AuthContextProps} The current authentication context value, which includes
 * the user state and any authentication-related functions or properties.
 *
 * @throws {Error} If the hook is used outside of an `AuthProvider`, it throws an error
 * indicating that `useAuth` must be used within an `AuthProvider` to function correctly.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}