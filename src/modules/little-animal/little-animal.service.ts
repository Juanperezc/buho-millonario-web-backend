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

  async find(id: number): Promise<LittleAnimal> {
    return this.littleAnimalRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<LittleAnimal[]> {
    return this.littleAnimalRepository.find();
  }

  async create(name: string, image: string): Promise<LittleAnimal> {
    const littleAnimal = this.littleAnimalRepository.create({
      name,
      image,
    });
    return this.littleAnimalRepository.save(littleAnimal);
  }

  async getRandom(): Promise<LittleAnimal> {
    return this.littleAnimalRepository
      .createQueryBuilder('littleAnimal')
      .orderBy('random()')
      .limit(1)
      .getOne();
  }

  async clear(): Promise<void> {
    await this.littleAnimalRepository.query(
      'TRUNCATE TABLE "little_animal" CASCADE',
    );
    await this.littleAnimalRepository.query(
      'ALTER SEQUENCE "state_id_seq" RESTART WITH 1',
    );
  }
}
