import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLotteryDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  ticketPrice: number;

  @IsNumber()
  reward1Digits: number;

  @IsNumber()
  reward2Digits: number;

  @IsNumber()
  reward3Digits: number;

  @IsNumber()
  reward4Digits: number;

  @IsNumber()
  reward5Digits: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  finishDate: Date;
}
