import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
import {
  WinnerTicket,
  WinnerTicketType,
} from '@modules/winner-ticket/winner-ticket.entity';
import { WinnerTicketService } from '@modules/winner-ticket/winner-ticket.service';
import { CreateLotteryDTO } from './dtos/create-lottery.dto';
import { UpdateLotteryDto } from './dtos/update-lottery.dto';
import { Lottery } from './lottery.entity';

@Injectable()
export class LotteryService {
  constructor(
    @InjectRepository(Lottery)
    private lotteryRepository: Repository<Lottery>,
    private winnerTicketService: WinnerTicketService,
  ) {}

  async findAll(): Promise<Lottery[]> {
    return this.lotteryRepository.find();
  }

  async activeLottery(): Promise<Lottery[]> {
    // get all lotteries where startDate is less than now and resultDigits is null
    return this.lotteryRepository.find({
      where: {
        resultDigits: IsNull(),
      },
    });
  }

  async find(id: number): Promise<Lottery> {
    const lottery = await this.lotteryRepository.findOne({ where: { id } });
    if (!lottery) {
      throw new NotFoundException('Lottery not found');
    }
    return lottery;
  }

  async createLottery(lottery: CreateLotteryDTO): Promise<Lottery> {
    return this.lotteryRepository.save(lottery);
  }

  async updateLottery(
    id: number,
    lottery: UpdateLotteryDto,
  ): Promise<UpdateResult> {
    return this.lotteryRepository.update(id, lottery);
  }

  async deleteLottery(id: number): Promise<UpdateResult> {
    return this.lotteryRepository.softDelete(id);
  }

  async finishLottery(id: number, code: number = null): Promise<number> {
    const lottery = await this.lotteryRepository.findOne({
      relations: ['tickets.user'],
      where: { id },
    });
    const randomCode = code ?? Math.random() * 100000;
    lottery.resultDigits = randomCode;

    //assign prizes
    const tickets = lottery.tickets;

    const winners = tickets.map((ticket) => {
      let digitsMatched = 0;
      const ticketDigits = ticket.code.toString().padStart(5, '0').split('');
      const resultDigits = lottery.resultDigits
        .toString()
        .padStart(5, '0')
        .split('');

      for (let i = 0; i < ticketDigits.length; i++) {
        if (ticketDigits[i] === resultDigits[i]) {
          digitsMatched++;
        }
      }

      return {
        ticket: ticket,
        digitsMatched,
      };
    });

    // Sort winners by digits matched in descending order
    winners.sort((a, b) => b.digitsMatched - a.digitsMatched);

    // Assign prizes
    const rewardAmount = lottery.tickets.reduce(
      (sum, ticket) => sum + ticket.amount,
      0,
    );
    let reward = (lottery.reward5Digits / 100) * rewardAmount;
    let rewardType = WinnerTicketType.TYPE_5;

    for (const winner of winners) {
      if (winner.digitsMatched < 5) {
        reward = (lottery.reward4Digits / 100) * rewardAmount;
        rewardType = WinnerTicketType.TYPE_4;
      }

      if (winner.digitsMatched < 4) {
        reward = (lottery.reward3Digits / 100) * rewardAmount;
        rewardType = WinnerTicketType.TYPE_3;
      }

      if (winner.digitsMatched < 3) {
        reward = (lottery.reward2Digits / 100) * rewardAmount;
        rewardType = WinnerTicketType.TYPE_2;
      }

      if (winner.digitsMatched < 2) {
        reward = (lottery.reward1Digits / 100) * rewardAmount;
        rewardType = WinnerTicketType.TYPE_1;
      }

      const winnerTicket = new WinnerTicket();
      winnerTicket.ticket = winner.ticket;
      winnerTicket.amount = Math.round(reward);
      winnerTicket.type = rewardType;
      await this.winnerTicketService.create(winnerTicket);
    }

    return winners.length;
  }

  async clear(): Promise<void> {
    await this.lotteryRepository.query('TRUNCATE TABLE "lottery" CASCADE');
    await this.lotteryRepository.query(
      'ALTER SEQUENCE "state_id_seq" RESTART WITH 1',
    );
  }
}
