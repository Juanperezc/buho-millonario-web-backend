import { IsString } from 'class-validator';

export class AuthResetPasswordDto {
  @IsString()
  password: string;

  @IsString()
  token: string;
}
