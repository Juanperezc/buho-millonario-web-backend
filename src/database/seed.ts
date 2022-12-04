import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClearDb } from './seeders/clear.db';
import { LocationSeeder } from './seeders/location.seeder';
import { LotterySeeder } from './seeders/lottery.seeder';
import { SeederModule } from './seeders/seeder.module';
import { UserSeeder } from './seeders/user.seeder';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule).then(
    async (appContext) => {
      const logger = appContext.get(Logger);
      // eslint-disable-next-line no-unused-vars
      const clearDb = appContext.get(ClearDb);
      const locationSeeder = appContext.get(LocationSeeder);
      const userSeeder = appContext.get(UserSeeder);
      const lotterySeeder = appContext.get(LotterySeeder);
      try {
        await clearDb.seed();
        await locationSeeder.seed();
        await userSeeder.seed();
        await lotterySeeder.seed();
        logger.debug('Seeding complete!');
      } catch (error) {
        logger.error('Seeding failed!');
        throw error;
      } finally {
        appContext.close();
      }
    },
  );
}
bootstrap();
