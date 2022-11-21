import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { User } from '../user/user.entity';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
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
  async getUserProfile(userId: number): Promise<Partial<AuthUserInterface>> {
    const user = await this.usersService.find(userId);
    return {
      info: user,
    };
  }

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
    await this.usersService.update(userId, {
      firstName: authUpdateProfile.firstName,
      lastName: authUpdateProfile.lastName,
      birthDate: authUpdateProfile.birthDate,
      parish: { id: authUpdateProfile.parishId },
      address: authUpdateProfile.address,
      phone: authUpdateProfile.phone,
    });

    return this.getUserProfile(userId);
  }
}
