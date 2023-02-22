import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from 'src/accounts/service/accounts/accounts.service';
import { Account } from 'src/entities/account';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  getAccounts(): Promise<Account[]> {
    return this.accountsService.findAccounts();
  }

  @Post('add')
  createAccounts(@Body() data) {
    this.accountsService.createAccounts(data);
  }
}
