export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number; // Optional, defaults to 60 minutes
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  refreshToken?: string; // Optional, will use cookie if not provided
  expiresInMins?: number; // Optional, defaults to 60 minutes
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
