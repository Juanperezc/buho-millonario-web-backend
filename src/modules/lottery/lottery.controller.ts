import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateLotteryDTO } from './dtos/create-lottery.dto';
import { FinishLotteryDTO } from './dtos/finish-lottery.dto';
import { UpdateLotteryDto } from './dtos/update-lottery.dto';
import { LotteryService } from './lottery.service';

@Controller('lottery')
@UseGuards(JwtAuthGuard)
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Get()
  getAll() {
    return this.lotteryService.findAll();
  }

  @Get('/active')
  active() {
    return this.lotteryService.activeLottery();
  }

  @Get('/:id')
  getLottery(@Param('id') id: number) {
    return this.lotteryService.find(id);
  }

  @Post()
  createLottery(@Body() lottery: CreateLotteryDTO) {
    return this.lotteryService.createLottery(lottery);
  }

  @Put('/:id')
  updateLottery(@Param('id') id: number, @Body() lottery: UpdateLotteryDto) {
    return this.lotteryService.updateLottery(id, lottery);
  }

  @Delete('/:id')
  deleteLottery(@Param('id') id: number) {
    return this.lotteryService.deleteLottery(id);
  }

  @Post('/finish/:id')
  finishLottery(@Param('id') id, @Body() finishLotteryDTO: FinishLotteryDTO) {
    this.lotteryService.finishLottery(id, finishLotteryDTO.code);
  }
}
