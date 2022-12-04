import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  parishId: number;

  @IsString()
  address: string;

  @IsString()
  phone: string;
}
