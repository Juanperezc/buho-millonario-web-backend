import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  async findAll(): Promise<BankAccount[]> {
    return this.bankAccountRepository.find();
  }
  async clear(): Promise<void> {
    await this.bankAccountRepository.query(
      'TRUNCATE TABLE "bank_account" CASCADE',
    );
    await this.bankAccountRepository.query(
      'ALTER SEQUENCE "bank_account_id_seq" RESTART WITH 1',
    );
  }
}
