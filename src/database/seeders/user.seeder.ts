import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
//import { createManyUserFakers } from '../factories/user.faker';

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
    /*   const users = createManyUserFakers(10);
    for (const user of users) {
      await this.userService.create(
        user.email,
        user.password,
        user.firstName,
        user.lastName,
      );
    } */
  }
}
