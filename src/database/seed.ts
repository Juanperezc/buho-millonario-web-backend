import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LocationSeeder } from './seeders/location.seeder';
import { SeederModule } from './seeders/seeder.module';
import { UserSeeder } from './seeders/user.seeder';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule).then(
    async (appContext) => {
      const logger = appContext.get(Logger);
      // eslint-disable-next-line no-unused-vars
      const userSeeder = appContext.get(UserSeeder);
      const locationSeeder = appContext.get(LocationSeeder);
      try {
        // await userSeeder.seed();
        await locationSeeder.seed();
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
