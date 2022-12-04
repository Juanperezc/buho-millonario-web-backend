import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '@/mail/mail.service';
import { User } from '@modules/user/user.entity';
import { UserService } from '@modules/user/user.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { AuthUserInterface } from './interfaces/auth-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  //? Utils
  async validateUser(
    email: string,
    pass: string,
    withDeleted = false,
  ): Promise<User> {
    const user = await this.usersService.findOneByEmail(email, withDeleted);

    if (user && (await user.comparePassword(pass))) {
      return user;
    }
    return null;
  }

  async getUserInfo(user: User): Promise<Partial<AuthUserInterface>> {
    /* Destructuring the user object and removing the parish property from it. */
    const { parish, password, rememberToken, ...reduced } = user;
    return {
      info: {
        parish: user.parish,
        ...reduced,
      },
    };
  }
  async getAuthUser(user: User): Promise<Partial<AuthUserInterface>> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...this.getUserInfo(user),
    };
  }

  //? Methods
  async getUserProfile(userId: number): Promise<Partial<AuthUserInterface>> {
    const user = await this.usersService.find(userId);
    const profile = await this.getUserInfo(user);
    return {
      ...profile,
    };
  }

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const user = await this.validateUser(
      authLoginDto.email,
      authLoginDto.password,
      true,
    );
    if (user && user.closedReason && user.deletedAt) {
      throw new BadRequestException(['Tu cuenta ha sido cerrada.']);
    }
    if (user) {
      return this.getAuthUser(user);
    }
    throw new UnauthorizedException();
  }

  async register(authRegisterDto: AuthRegisterDto): Promise<any> {
    const user = await this.usersService.create(
      authRegisterDto.email,
      authRegisterDto.password,
      authRegisterDto.firstName,
      authRegisterDto.lastName,
      authRegisterDto.dni,
      authRegisterDto.birthDate,
      authRegisterDto.parishId,
    );
    return this.getAuthUser(user);
  }

  async update(
    userId: number,
    authUpdateProfile: UpdateProfileDto,
  ): Promise<any> {
    await this.usersService.update(userId, authUpdateProfile);
    return this.getUserProfile(userId);
  }

  async forgotPassword(email: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user) {
        const token = await this.usersService.generateResetPasswordToken(
          user.id,
        );
        return this.mailService.resetPasswordMail(
          user.firstName,
          user.email,
          token,
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async resetPassword(password: string, token: string): Promise<boolean> {
    const userId = await this.usersService.validateResetPasswordToken(token);
    if (userId) {
      await this.usersService.updatePassword(userId, password);
      return true;
    }
    throw new UnauthorizedException();
  }

  async closeAccount(userId: number, reasonText: string): Promise<any> {
    this.usersService.closeAccount(userId, reasonText);
  }
}
