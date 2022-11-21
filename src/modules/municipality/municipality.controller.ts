import { Controller, Get, Param } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';

@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

  @Get()
  getAll() {
    return this.municipalityService.findAll();
  }

  @Get('/by-state/:stateId')
  getAllByParishId(@Param('stateId') stateId: number) {
    return this.municipalityService.findAllByStateId(stateId);
  }
}
