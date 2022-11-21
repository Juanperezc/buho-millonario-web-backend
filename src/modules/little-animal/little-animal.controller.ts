import { Controller, Get } from '@nestjs/common';
import { LittleAnimalService } from './little-animal.service';

@Controller('little-animal')
export class LittleAnimalController {
  constructor(private readonly littleAnimalService: LittleAnimalService) {}

  @Get('/')
  getAll() {
    return this.littleAnimalService.findAll();
  }
}
