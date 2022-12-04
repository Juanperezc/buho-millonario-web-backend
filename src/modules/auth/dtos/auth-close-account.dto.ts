import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCloseAccountDto {
  @IsString()
  @IsNotEmpty()
  closeReason: string;
}
