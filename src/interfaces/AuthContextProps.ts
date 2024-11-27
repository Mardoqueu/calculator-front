export interface AuthContextProps {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}