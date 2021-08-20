export interface AuthUser {
  user: CurrentUser;
  message: string;
  expiresIn: number;
}

export interface CurrentUser {
  id: string;
  username: string;
  token: string;
}
