import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { RechargeTypeEnum } from '../enums/recharge-type.enum';

export class CreateRechargeDTO {
  @IsNotEmpty()
  @IsEnum(RechargeTypeEnum)
  type: RechargeTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
