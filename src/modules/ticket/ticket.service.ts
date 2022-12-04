import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async clear(): Promise<void> {
    await this.ticketRepository.query('TRUNCATE TABLE "ticket" CASCADE');
  }
  async findTicketByUser(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['littleAnimal'],
    });
  }
}
