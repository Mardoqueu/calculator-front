import { jwtDecode } from "jwt-decode";
import { DecodeTokenProps } from "../interfaces/DecodeTokenProps";

export const isTokenExpired = (token: string): boolean => {
  const decoded: DecodeTokenProps = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp < now;
}