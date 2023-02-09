import { IsOptional } from 'class-validator';

export class FinishLotteryDTO {
  @IsOptional()
  code: number;

  @IsOptional()
  littleAnimalId: number;
}
