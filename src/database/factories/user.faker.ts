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
  dni: string;
  birthDate?: Date;
  parishId;
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
    dni: faker.datatype.number(99999999).toString(),
    birthDate: faker.date.past(),
    parishId: faker.datatype.number({ min: 1, max: 22 }),
    ...overrides,
  };
};

export const createManyUserFakers = (
  count: number,
  overrides: Partial<User> = {},
): UserFakerInterface[] => {
  return Array.from({ length: count }, () => createUserFaker(overrides));
};
