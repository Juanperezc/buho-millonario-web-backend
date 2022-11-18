import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { MunicipalityModule } from '@modules/municipality/municipality.module';
import { ParishModule } from '@modules/parish/parish.module';
import { StateModule } from '@modules/state/state.module';
import { UserModule } from '@modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    StateModule,
    ParishModule,
    MunicipalityModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
