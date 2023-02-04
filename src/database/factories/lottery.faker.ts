import { faker } from '@faker-js/faker';
import { Lottery } from '@/modules/lottery/lottery.entity';

interface LotteryFakerInterface {
  title: string;
  description: string;
  ticketPrice: number;
  resultDigits: number;
  reward1Digits: number;
  reward2Digits: number;
  reward3Digits: number;
  reward4Digits: number;
  reward5Digits: number;
  startDate: Date;
  finishDate: Date;
}
const createLotteryFaker = (
  overrides: Partial<LotteryFakerInterface> = {},
): LotteryFakerInterface => {
  return {
    title: faker.company.name(),
    description: faker.lorem.paragraph(),
    ticketPrice: faker.datatype.number(100),
    resultDigits: Math.random() < 0.5 ? null : faker.datatype.number(99999),
    reward1Digits: faker.datatype.number({ min: 10, max: 20 }),
    reward2Digits: faker.datatype.number({ min: 20, max: 30 }),
    reward3Digits: faker.datatype.number({ min: 30, max: 40 }),
    reward4Digits: faker.datatype.number({ min: 40, max: 50 }),
    reward5Digits: faker.datatype.number({ min: 50, max: 60 }),
    startDate: faker.date.recent(1),
    finishDate: faker.date.recent(20),
    ...overrides,
  };
};

export const createManyLotteryFakers = (
  count: number,
  overrides: Partial<Lottery> = {},
): LotteryFakerInterface[] => {
  return Array.from({ length: count }, () => createLotteryFaker(overrides));
};
