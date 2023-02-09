import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { WinnerTicketService } from './winner-ticket.service';

@Controller('winner-ticket')
@UseGuards(JwtAuthGuard)
export class WinnerTicketController {
  constructor(private readonly winnerTicketService: WinnerTicketService) {}

  @Post('/claim/:id')
  claimPrize(@Param('id') id: number) {
    return this.winnerTicketService.claimPrize(id);
    //return this.winnerTicketService.findAll();
  }
}
