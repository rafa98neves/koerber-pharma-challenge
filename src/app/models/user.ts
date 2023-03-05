/**
 * User session data
 */
export interface UserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

/**
 * User saved credentials
 */
export interface Credentials {
  username: string;
  password: string;
}
