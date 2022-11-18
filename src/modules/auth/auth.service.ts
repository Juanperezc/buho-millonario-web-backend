import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { User } from '../user/user.entity';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthUserInterface } from './interfaces/auth-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  //? Utils
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await user.comparePassword(pass))) {
      return user;
    }
    return null;
  }

  async getAuthUser(user: User): Promise<AuthUserInterface> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      info: user,
    };
  }

  //? Methods

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const user = await this.validateUser(
      authLoginDto.email,
      authLoginDto.password,
    );
    if (user) {
      return this.getAuthUser(user);
    }
    throw new UnauthorizedException();
  }

  async register(authLoginDto: AuthRegisterDto): Promise<any> {
    const user = await this.usersService.create(
      authLoginDto.email,
      authLoginDto.password,
      authLoginDto.firstName,
      authLoginDto.lastName,
    );
    return this.getAuthUser(user);
  }
}
