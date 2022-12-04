import { Controller, Get } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Get('/')
  getAll() {
    return this.bankAccountService.findAll();
  }
}
