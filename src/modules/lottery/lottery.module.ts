import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotteryController } from './lottery.controller';
import { Lottery } from './lottery.entity';
import { LotteryService } from './lottery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lottery])],
  controllers: [LotteryController],
  providers: [LotteryService],
  exports: [LotteryService],
})
export class LotteryModule {}
