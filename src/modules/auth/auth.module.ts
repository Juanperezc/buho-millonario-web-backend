import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@modules/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/common/constants/auth';
import { JwtStrategy } from './strategies/jwt.strategy';
import { IsUserAlreadyExistsRule } from './rules/user-already-exists.rule';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, IsUserAlreadyExistsRule],
  exports: [AuthService],
})
export class AuthModule {}
