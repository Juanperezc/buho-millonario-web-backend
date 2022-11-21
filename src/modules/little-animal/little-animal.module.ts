import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LittleAnimalController } from './little-animal.controller';
import { LittleAnimal } from './little-animal.entity';
import { LittleAnimalService } from './little-animal.service';

@Module({
  imports: [TypeOrmModule.forFeature([LittleAnimal])],
  controllers: [LittleAnimalController],
  providers: [LittleAnimalService],
  exports: [LittleAnimalService],
})
export class LittleAnimalModule {}
