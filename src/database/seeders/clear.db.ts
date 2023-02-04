import { Injectable, Logger } from '@nestjs/common';
import { BankAccountService } from '@/modules/back-account/bank-account.service';
import { LittleAnimalService } from '@/modules/little-animal/little-animal.service';
import { LotteryService } from '@/modules/lottery/lottery.service';
import { MunicipalityService } from '@/modules/municipality/municipality.service';
import { ParishService } from '@/modules/parish/parish.service';
import { StateService } from '@/modules/state/state.service';
import { TicketService } from '@/modules/ticket/ticket.service';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class ClearDb {
  constructor(
    private readonly logger: Logger,
    private readonly bankAccountService: BankAccountService,
    private readonly userService: UserService,
    private readonly stateService: StateService,
    private readonly municipalityService: MunicipalityService,
    private readonly parishService: ParishService,
    private readonly ticketService: TicketService,
    private readonly lotteryService: LotteryService,
    private readonly littleAnimalService: LittleAnimalService,
  ) {}
  async seed() {
    await this.handle()
      .then((completed) => {
        this.logger.debug('Successfully clear db...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed clearing db...');
        Promise.reject(error);
      });
  }
  async handle() {
    await this.ticketService.clear();
    this.logger.debug('Successfully ticketService table cleared...');
    await this.bankAccountService.clear();
    this.logger.debug('Successfully bankAccount table cleared...');
    await this.userService.clear();
    this.logger.debug('Successfully userService table cleared...');
    await this.parishService.clear();
    this.logger.debug('Successfully parishService table cleared...');
    await this.municipalityService.clear();
    this.logger.debug('Successfully municipalityService table cleared...');
    await this.stateService.clear();
    this.logger.debug('Successfully stateService table cleared...');
    await this.lotteryService.clear();
    this.logger.debug('Successfully lotteryService table cleared...');
    await this.littleAnimalService.clear();
    this.logger.debug('Successfully littleAnimalService table cleared...');
  }
}
