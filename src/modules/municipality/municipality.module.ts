import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipalityController } from './municipality.controller';
import { Municipality } from './municipality.entity';
import { MunicipalityService } from './municipality.service';

@Module({
  imports: [TypeOrmModule.forFeature([Municipality])],
  controllers: [MunicipalityController],
  providers: [MunicipalityService],
  exports: [MunicipalityService],
})
export class MunicipalityModule {}
