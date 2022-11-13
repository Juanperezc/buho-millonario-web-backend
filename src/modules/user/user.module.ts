import { UserController } from './user.controller';
import { userProviders } from '@/providers/user/user.provider';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '@/providers/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
