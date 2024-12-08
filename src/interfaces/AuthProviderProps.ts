import { ReactNode } from "react";

/**
 * AuthProviderProps defines the property types for the AuthProvider component.
 *
 * Properties:
 * - children: Represents the ReactNode elements that the AuthProvider will render
 *   and provide authentication context to. It allows you to nest components that
 *   require authentication information.
 */
export interface AuthProviderProps {
  children: ReactNode;
}
