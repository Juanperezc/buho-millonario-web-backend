import { Controller, Get, Param } from '@nestjs/common';
import { ParishService } from './parish.service';

@Controller('parish')
export class ParishController {
  constructor(private readonly parishService: ParishService) {}

  @Get()
  getAll() {
    return this.parishService.findAll();
  }

  @Get('by-municipality/:municipalityId')
  getAllByMunicipalityId(@Param('municipalityId') municipalityId: number) {
    return this.parishService.findByMunicipalityId(municipalityId);
  }
}
