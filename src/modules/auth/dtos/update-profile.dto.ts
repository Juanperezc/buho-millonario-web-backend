import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
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

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;
}
