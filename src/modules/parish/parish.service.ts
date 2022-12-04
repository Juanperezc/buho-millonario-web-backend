import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parish } from './parish.entity';

@Injectable()
export class ParishService {
  constructor(
    @InjectRepository(Parish)
    private parishRepository: Repository<Parish>,
  ) {}

  async findAll(): Promise<Parish[]> {
    return this.parishRepository.find();
  }

  async findByMunicipalityId(municipalityId: number): Promise<Parish[]> {
    return this.parishRepository.find({
      where: {
        municipality: {
          id: municipalityId,
        },
      },
    });
  }
  async clear(): Promise<void> {
    await this.parishRepository.query('TRUNCATE TABLE "parish" CASCADE');
  }
}
