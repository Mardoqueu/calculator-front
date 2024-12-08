import { jwtDecode } from "jwt-decode";
import { DecodeTokenProps } from "../interfaces/DecodeTokenProps";

/**
 * Determines if a given JWT token is expired.
 *
 * This function decodes the provided JSON Web Token (JWT) to extract the expiration time
 * and compares it against the current time to ascertain whether the token is no longer valid.
 *
 * @param {string} token - The JSON Web Token (JWT) to be checked.
 * @returns {boolean} Returns true if the token is expired, otherwise false.
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded: DecodeTokenProps = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp < now;
}