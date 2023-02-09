import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LittleAnimalService } from '@modules/little-animal/little-animal.service';
import { LotteryService } from '@modules/lottery/lottery.service';
import { UserService } from '@modules/user/user.service';
import { CreateTicketDTO } from './dtos/create-ticket.dto';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private userService: UserService,
    private littleAnimal: LittleAnimalService,
    private lotteryService: LotteryService,
  ) {}

  async clear(): Promise<void> {
    await this.ticketRepository.query('TRUNCATE TABLE "ticket" CASCADE');
    await this.ticketRepository.query(
      'ALTER SEQUENCE "ticket_id_seq" RESTART WITH 1',
    );
  }

  async find(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findTicketByUser(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['littleAnimal', 'winnerTicket'],
    });
  }

  async changeVisibility(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });
    ticket.visibility = !ticket.visibility;
    return this.ticketRepository.save(ticket);
  }

  async create(
    userId: number,
    createTicketDto: CreateTicketDTO,
  ): Promise<Ticket> {
    if (!createTicketDto.littleAnimalId) {
      //?assign random little animal
      const littleAnimal = await this.littleAnimal.getRandom();
      createTicketDto.littleAnimalId = littleAnimal.id;
    }
    if (!createTicketDto.code) {
      //?assign random 5 digits number
      createTicketDto.code = Math.floor(
        10000 + Math.random() * 90000,
      ).toString();
    }

    const lottery = await this.lotteryService.find(createTicketDto.lotteryId);

    if (!lottery) {
      throw new InternalServerErrorException('Lottery not found');
    }

    //?validate if code has not been used
    const ticket = await this.ticketRepository.findOne({
      where: {
        code: createTicketDto.code,
        lottery: {
          id: createTicketDto.lotteryId,
        },
      },
    });
    if (ticket) {
      throw new BadRequestException({
        message: ['El Código ya ha sido usado'],
      });
    }

    //?discount ticket price from user balance

    const user = await this.userService.find(userId);
    //validate if user has enough balance
    if (user.budget < lottery.ticketPrice) {
      throw new BadRequestException({
        message: ['No tienes suficiente dinero'],
      });
    }
    this.userService.updateBalance(userId, lottery.ticketPrice, 'subtraction');

    const data = {
      littleAnimal: {
        id: createTicketDto.littleAnimalId,
      },
      lottery: {
        id: createTicketDto.lotteryId,
      },
      code: createTicketDto.code,
      amount: lottery.ticketPrice,
      user: {
        id: userId,
      },
    };
    return this.ticketRepository.save(data);
  }
}
