export interface AuthUser {
  user: {
    id: string;
    username: string;
    token: string;
  };
  message: string;
  expiresIn: number;
}
