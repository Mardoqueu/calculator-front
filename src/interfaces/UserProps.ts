/**
 * Represents the properties required for a user entity.
 *
 * This interface is used to define the structure of user data, particularly in contexts where user credentials are handled,
 * such as authentication processes or user account management systems.
 *
 * Properties:
 * @property {FormDataEntryValue | null} userName - The username associated with the user account. This value can be null if not provided.
 * @property {FormDataEntryValue | null} password - The user's password. This value can be null if not provided.
 */
export interface UserProps {
  userName: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}