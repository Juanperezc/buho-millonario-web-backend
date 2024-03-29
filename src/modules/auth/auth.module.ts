import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '@/common/constants/auth';
import { MailModule } from '@/mail/mail.module';
import { UserModule } from '@modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IsDniAlreadyExists } from './rules/dni-already-exists.rule';
import { IsUserAlreadyExistsRule } from './rules/user-already-exists.rule';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MailModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    IsUserAlreadyExistsRule,
    IsDniAlreadyExists,
  ],
  exports: [AuthService],
})
export class AuthModule {}
