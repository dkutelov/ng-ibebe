export interface AuthUser {
  user: CurrentUser;
  message: string;
  expiresIn: number;
}

export interface CurrentUser {
  id: string;
  _id: string;
  avatar: string;
  username: string;
  email: string;
  token: string;
}
