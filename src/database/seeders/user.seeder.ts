import { Injectable, Logger } from '@nestjs/common';
import { RoleEnum } from '@/modules/user/enums/role.enum';
import { UserService } from '@/modules/user/user.service';
import { createManyUserFakers } from '../factories/user.faker';

@Injectable()
export class UserSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}
  async seed() {
    await this.handle()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async handle() {
    const users = createManyUserFakers(50);
    for (const user of users) {
      await this.userService.create(
        user.email,
        user.password,
        user.firstName,
        user.lastName,
        user.dni,
        user.birthDate,
        user.parishId,
        user.phone,
      );
    }

    await this.userService.create(
      'juanl1996@hotmail.com',
      'prueba1234',
      'Juan',
      'Perez',
      '25141826',
      new Date('1996-10-10'),
      1,
      '0414-1234567',
      RoleEnum.ADMIN,
    );

    await this.userService.create(
      'cristzencoff@gmail.com',
      'prueba1234',
      'Shely',
      'Zencoff',
      '23112311',
      new Date('1996-10-10'),
      1,
      '0414-1234567',
      RoleEnum.ADMIN,
    );
  }
}
