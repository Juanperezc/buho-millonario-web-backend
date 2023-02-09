import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '@modules/user/user.service';
import { WinnerTicket } from './winner-ticket.entity';

@Injectable()
export class WinnerTicketService {
  constructor(
    @InjectRepository(WinnerTicket)
    private winnerTicketRepository: Repository<WinnerTicket>,
    private userService: UserService,
  ) {}

  create(data: WinnerTicket) {
    this.winnerTicketRepository.save(data);
  }

  async claimPrize(id: number) {
    const winnerTicket = await this.winnerTicketRepository.findOne({
      relations: ['ticket.user'],
      where: {
        id: id,
      },
    });

    if (winnerTicket && !winnerTicket.isReward) {
      this.userService.updateBalance(
        winnerTicket.ticket.user.id,
        winnerTicket.amount,
        'addition',
      );
      this.winnerTicketRepository.update(
        { id: id },
        {
          isReward: true,
        },
      );
    } else {
      throw new NotFoundException();
    }
  }
}
