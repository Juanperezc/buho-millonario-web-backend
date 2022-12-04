import { faker } from '@faker-js/faker';
import { Lottery } from '@/modules/lottery/lottery.entity';

interface LotteryFakerInterface {
  title: string;
  description: string;
  ticketPrice: number;
  totalReward: number;
  resultDigits: number;
  reward1Digit: number;
  reward2Digits: number;
  reward3Digits: number;
  reward4Digits: number;
  reward5Digits: number;
}
const createLotteryFaker = (
  overrides: Partial<LotteryFakerInterface> = {},
): LotteryFakerInterface => {
  return {
    title: faker.company.name(),
    description: faker.lorem.paragraph(),
    ticketPrice: faker.datatype.number(100),
    totalReward: faker.datatype.number(1000),
    resultDigits: faker.datatype.number(99999),
    reward1Digit: faker.datatype.number(100),
    reward2Digits: faker.datatype.number(100),
    reward3Digits: faker.datatype.number(100),
    reward4Digits: faker.datatype.number(100),
    reward5Digits: faker.datatype.number(100),
    ...overrides,
  };
};

export const createManyLotteryFakers = (
  count: number,
  overrides: Partial<Lottery> = {},
): LotteryFakerInterface[] => {
  return Array.from({ length: count }, () => createLotteryFaker(overrides));
};
