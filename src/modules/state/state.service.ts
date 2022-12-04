import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  async findAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  async save(state: any): Promise<State> {
    return this.stateRepository.save(state);
  }
  async clear(): Promise<void> {
    await this.stateRepository.query('TRUNCATE TABLE "state" CASCADE');
  }
}
