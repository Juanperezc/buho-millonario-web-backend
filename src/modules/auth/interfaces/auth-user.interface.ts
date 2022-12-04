export interface UserInfoInterface {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  role: string;

  phone: string;

  dni: string;

  birthDate: Date;

  budget: number;

  address: string;

  parish: Record<string, any>;
}
export interface AuthUserInterface {
  access_token: string;
  info: UserInfoInterface;
}
