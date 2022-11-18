import { faker } from '@faker-js/faker';
import { RoleEnum } from '@/modules/user/enums/role.enum';
import { User } from '@/modules/user/user.entity';

interface UserFakerInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleEnum;
  phone: string;
}
const createUserFaker = (
  overrides: Partial<UserFakerInterface> = {},
): UserFakerInterface => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: RoleEnum.USER,
    phone: faker.phone.number(),
    ...overrides,
  };
};

export const createManyUserFakers = (
  count: number,
  overrides: Partial<User> = {},
): UserFakerInterface[] => {
  return Array.from({ length: count }, () => createUserFaker(overrides));
};
