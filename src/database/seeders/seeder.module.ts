import { Logger, Module } from '@nestjs/common';
import { BankAccountModule } from '@/modules/back-account/bank-account.module';
import { LotteryModule } from '@/modules/lottery/lottery.module';
import { MunicipalityModule } from '@/modules/municipality/municipality.module';
import { ParishModule } from '@/modules/parish/parish.module';
import { StateModule } from '@/modules/state/state.module';
import { TicketModule } from '@/modules/ticket/ticket.module';
import { UserModule } from '@/modules/user/user.module';
import { DatabaseModule } from '../database.module';
import { ClearDb } from './clear.db';
import { LocationSeeder } from './location.seeder';
import { LotterySeeder } from './lottery.seeder';
import { UserSeeder } from './user.seeder';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    StateModule,
    MunicipalityModule,
    ParishModule,
    LotteryModule,
    BankAccountModule,
    TicketModule,
  ],
  providers: [Logger, UserSeeder, LocationSeeder, LotterySeeder, ClearDb],
})
export class SeederModule {}
