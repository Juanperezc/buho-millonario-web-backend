import { Controller, Get } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';

@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

  @Get()
  getAll() {
    return this.municipalityService.findAll();
  }
}
