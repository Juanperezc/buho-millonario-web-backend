import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinnerTicketModule } from '@modules/winner-ticket/winner-ticket.module';
import { LotteryController } from './lottery.controller';
import { Lottery } from './lottery.entity';
import { LotteryService } from './lottery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lottery]), WinnerTicketModule],
  controllers: [LotteryController],
  providers: [LotteryService],
  exports: [LotteryService],
})
export class LotteryModule {}
