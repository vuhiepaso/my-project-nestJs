import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountsService } from 'src/accounts/service/accounts/accounts.service';
import { Account } from 'src/entity/account';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  async getAccounts(@Response() res): Promise<Account[]> {
    try {
      const accounts = await this.accountsService.findAccounts();
      return res.status(200).json({
        status: 'success',
        message: 'Get accounts successfully!',
        data: accounts,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Error getting users!',
        error: error,
      });
    }
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('register')
  async createAccounts(@Body() account: Account, @Response() res) {
    try {
      const email = await this.accountsService.finByEmail(account.email);
      if (email.length) {
        return res.status(400).json({
          status: '400',
          message: `${email[0].email} is email already exist !`,
        });
      }
      await this.accountsService.createAccounts(account);
      return res.status(200).json({
        status: 'success',
        message: 'Add accounts successfully!',
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Error getting users!',
        error: error,
      });
    }
  }
}
