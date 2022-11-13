import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsUserAlreadyExistsRule } from '../rules/user-already-exists.rule';

export class AuthRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
  
  @IsEmail()
  @Validate(IsUserAlreadyExistsRule)
  email: string;

  @IsNotEmpty()
  password: string;
}
