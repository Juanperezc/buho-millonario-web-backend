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
}
