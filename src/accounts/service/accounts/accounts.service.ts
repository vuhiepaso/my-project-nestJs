import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entity/account';
import { Repository } from 'typeorm';
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  async findAccounts(): Promise<Account[]> {
    return await this.accountRepository.find();
  }
  async createAccounts(data): Promise<Account> {
    // const pass = this.hashPassword
    const account = new Account();
    account.id;
    account.email = data.email;
    account.username = data.username;
    account.password = data.password;
    account.isActive = data.isActive;

    return await this.accountRepository.save(data);
  }
}
