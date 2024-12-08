/**
 * Interface representing the authorization context properties.
 *
 * This interface is used to define the shape of the context object that holds
 * the user's authentication token and a function to update the token.
 *
 * Properties:
 * @property {string | null} userToken - The current authentication token for the user. This token is used to manage user sessions and may be null if the user is not authenticated.
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setUserToken - A function to update the user's authentication token. This function typically is used to set or remove the token as part of login or logout processes.
 */
export interface AuthContextProps {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}