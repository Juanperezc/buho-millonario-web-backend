import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LittleAnimal } from './little-animal.entity';

@Injectable()
export class LittleAnimalService {
  constructor(
    @InjectRepository(LittleAnimal)
    private littleAnimalRepository: Repository<LittleAnimal>,
  ) {}

  async findAll(): Promise<LittleAnimal[]> {
    return this.littleAnimalRepository.find();
  }
}
