import { Logger, Module } from '@nestjs/common';
import { LotteryModule } from '@/modules/lottery/lottery.module';
import { StateModule } from '@/modules/state/state.module';
import { UserModule } from '@/modules/user/user.module';
import { DatabaseModule } from '../database.module';
import { LocationSeeder } from './location.seeder';
import { LotterySeeder } from './lottery.seeder';
import { UserSeeder } from './user.seeder';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [DatabaseModule, UserModule, StateModule, LotteryModule],
  providers: [Logger, UserSeeder, LocationSeeder, LotterySeeder],
})
export class SeederModule {}
