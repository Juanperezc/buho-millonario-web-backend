import { Logger, Module } from '@nestjs/common';
import { StateModule } from '@/modules/state/state.module';
import { UserModule } from '@/modules/user/user.module';
import { DatabaseModule } from '../database.module';
import { LocationSeeder } from './location.seeder';
import { UserSeeder } from './user.seeder';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [DatabaseModule, UserModule, StateModule],
  providers: [Logger, UserSeeder, LocationSeeder],
})
export class SeederModule {}
