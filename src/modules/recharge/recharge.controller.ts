import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtInterface } from '@/common/interfaces/jwt-request.interface';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateRechargeDTO } from './dtos/create-recharge.dto';
import { RechargeService } from './recharge.service';

@Controller('recharge')
@UseGuards(JwtAuthGuard)
export class RechargeController {
  constructor(private readonly rechargeService: RechargeService) {}

  @Get()
  getAll() {
    return this.rechargeService.findAll();
  }

  @Post()
  create(@Request() req: JwtInterface, @Body() recharge: CreateRechargeDTO) {
    return this.rechargeService.save(req.user.id, recharge);
  }
}
