import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LittleAnimalModule } from '@modules/little-animal/little-animal.module';
import { LotteryModule } from '@modules/lottery/lottery.module';
import { UserModule } from '@modules/user/user.module';
import { TicketController } from './ticket.controller';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    UserModule,
    LotteryModule,
    LittleAnimalModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
