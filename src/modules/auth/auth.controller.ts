import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtInterface } from '@/common/interfaces/jwt-request.interface';
import { AuthService } from './auth.service';
import { AuthCloseAccountDto } from './dtos/auth-close-account.dto';
import { AuthForgotPasswordDto } from './dtos/auth-forgot-password.dto';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthResetPasswordDto } from './dtos/auth-reset-password.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('/sign-up')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: JwtInterface) {
    return this.authService.getUserProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  updateProfile(
    @Request() req: JwtInterface,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.update(req.user.id, updateProfileDto);
  }

  @Post('/forgot-password')
  @HttpCode(200)
  forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('/reset-password')
  @HttpCode(200)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.password,
      resetPasswordDto.token,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/close-account')
  closeAccount(
    @Request() req: JwtInterface,
    @Body() closeReasonDto: AuthCloseAccountDto,
  ) {
    return this.authService.closeAccount(
      req.user.id,
      closeReasonDto.closeReason,
    );
  }
}
