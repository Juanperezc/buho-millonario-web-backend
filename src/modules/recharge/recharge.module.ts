import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { RechargeController } from './recharge.controller';
import { Recharge } from './recharge.entity';
import { RechargeService } from './recharge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recharge]), UserModule],
  controllers: [RechargeController],
  providers: [RechargeService],
  exports: [RechargeService],
})
export class RechargeModule {}
