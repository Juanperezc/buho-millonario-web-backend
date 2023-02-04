import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTicketDTO {
  @IsNumber()
  @IsOptional()
  code: string;

  @IsNumber()
  @IsOptional()
  littleAnimalId: number;

  @IsNumber()
  @IsNotEmpty()
  lotteryId: number;
}
