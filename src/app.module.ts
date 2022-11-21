import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { LittleAnimal } from '@modules/little-animal/little-animal.entity';
import { LotteryModule } from '@modules/lottery/lottery.module';
import { MunicipalityModule } from '@modules/municipality/municipality.module';
import { ParishModule } from '@modules/parish/parish.module';
import { StateModule } from '@modules/state/state.module';
import { TicketModule } from '@modules/ticket/ticket.module';
import { UserModule } from '@modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
