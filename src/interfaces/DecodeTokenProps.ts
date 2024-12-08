/**
 * Represents the properties of a decoded token.
 *
 * This interface is primarily used to encapsulate the expiration time
 * property of a token after it has been decoded. The expiration time
 * is measured in seconds since the Unix epoch.
 *
 * @property {number} exp - The expiration time of the token, measured
 * in seconds since the Unix epoch.
 */
export interface DecodeTokenProps {
  exp: number;
}