import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { BankAccount } from '@modules/back-account/bank-account.entity';
import { LittleAnimal } from '@modules/little-animal/little-animal.entity';
import { LotteryModule } from '@modules/lottery/lottery.module';
import { MunicipalityModule } from '@modules/municipality/municipality.module';
import { ParishModule } from '@modules/parish/parish.module';
import { RechargeModule } from '@modules/recharge/recharge.module';
import { StateModule } from '@modules/state/state.module';
import { TicketModule } from '@modules/ticket/ticket.module';
import { UserModule } from '@modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { WinnerTicketModule } from './modules/winner-ticket/winner-ticket.module';

@Module({
  imports: [
    DatabaseModule,
    StateModule,
    ParishModule,
    LittleAnimal,
    MunicipalityModule,
    UserModule,
    AuthModule,
    LotteryModule,
    TicketModule,
    BankAccount,
    RechargeModule,
    WinnerTicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
