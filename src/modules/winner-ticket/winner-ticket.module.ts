import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { WinnerTicketController } from './winner-ticket.controller';
import { WinnerTicket } from './winner-ticket.entity';
import { WinnerTicketService } from './winner-ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([WinnerTicket]), UserModule],
  controllers: [WinnerTicketController],
  providers: [WinnerTicketService],
  exports: [WinnerTicketService],
})
export class WinnerTicketModule {}
