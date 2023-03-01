import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AccountsService } from 'src/accounts/service/accounts/accounts.service';
import { Account } from 'src/entity/account';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  getAccounts(): Promise<Account[]> {
    return this.accountsService.findAccounts();
  }

  @Post('add')
  createAccounts(@Body() account: Account) {
    this.accountsService.createAccounts(account);
  }
}
