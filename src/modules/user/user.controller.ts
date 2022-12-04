import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.userService.findAll(true);
  }

  @Post('/restore/:id')
  @UseGuards(JwtAuthGuard)
  restoreAccount(@Param('id') id: number) {
    return this.userService.restoreAccount(id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  show(@Param('id') id: number) {
    return this.userService.find(id, true);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
