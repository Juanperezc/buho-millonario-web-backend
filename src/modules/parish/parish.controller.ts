import { Controller, Get } from '@nestjs/common';
import { ParishService } from './parish.service';

@Controller('parish')
export class ParishController {
  constructor(private readonly parishService: ParishService) {}

  @Get()
  getAll() {
    return this.parishService.findAll();
  }
}
