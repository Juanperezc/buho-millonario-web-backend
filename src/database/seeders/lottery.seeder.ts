import { Injectable, Logger } from '@nestjs/common';
import { Lottery } from '@/modules/lottery/lottery.entity';
import { LotteryService } from '@/modules/lottery/lottery.service';
import { createManyLotteryFakers } from '../factories/lottery.faker';

@Injectable()
export class LotterySeeder {
  constructor(
    private readonly logger: Logger,
    private readonly lotteryService: LotteryService,
  ) {}
  async seed() {
    await this.handle()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding lotteries...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding lotteries...');
        Promise.reject(error);
      });
  }
  async handle() {
    const lotteries = createManyLotteryFakers(10);
    for (const lottery of lotteries) {
      const lotteryEntity = new Lottery();
      lotteryEntity.title = lottery.title;
      lotteryEntity.description = lottery.description;
      lotteryEntity.ticketPrice = lottery.ticketPrice;
      lotteryEntity.resultDigits = lottery.resultDigits;
      lotteryEntity.reward2Digits = lottery.reward2Digits;
      lotteryEntity.reward3Digits = lottery.reward3Digits;
      lotteryEntity.reward4Digits = lottery.reward4Digits;
      lotteryEntity.reward5Digits = lottery.reward5Digits;
      lotteryEntity.startDate = lottery.startDate;
      lotteryEntity.finishDate = lottery.finishDate;

      await this.lotteryService.createLottery(lotteryEntity);
    }
  }
}
