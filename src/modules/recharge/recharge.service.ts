import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRechargeDTO } from './dtos/create-recharge.dto';
import { Recharge } from './recharge.entity';

@Injectable()
export class RechargeService {
  constructor(
    @InjectRepository(Recharge)
    private rechargeRepository: Repository<Recharge>,
  ) {}

  async findAll(): Promise<Recharge[]> {
    return this.rechargeRepository.find();
  }

  async save(userId: number, recharge: CreateRechargeDTO): Promise<Recharge> {
    return this.rechargeRepository.save({
      ...recharge,
      user: {
        id: userId,
      },
    });
  }
  async clear(): Promise<void> {
    await this.rechargeRepository.query('TRUNCATE TABLE "recharge" CASCADE');
    await this.rechargeRepository.query(
      'ALTER SEQUENCE "recharge_id_seq" RESTART WITH 1',
    );
  }
}
