import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinnerTicketModule } from '@modules/winner-ticket/winner-ticket.module';
import { LittleAnimalModule } from '../little-animal/little-animal.module';
import { LotteryController } from './lottery.controller';
import { Lottery } from './lottery.entity';
import { LotteryService } from './lottery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lottery]),
    WinnerTicketModule,
    LittleAnimalModule,
  ],
  controllers: [LotteryController],
  providers: [LotteryService],
  exports: [LotteryService],
})
export class LotteryModule {}
