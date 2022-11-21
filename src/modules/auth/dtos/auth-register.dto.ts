import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsDniAlreadyExists } from '../rules/dni-already-exists.rule';
import { IsUserAlreadyExistsRule } from '../rules/user-already-exists.rule';

export class AuthRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @Validate(IsUserAlreadyExistsRule)
  email: string;

  @Validate(IsDniAlreadyExists)
  dni: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  parishId: number;

  @IsNotEmpty()
  password: string;
}
