import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entity/account';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  async findAccounts(): Promise<Account[]> {
    return await this.accountRepository.find();
  }
  async createAccounts(data): Promise<Account> {
    const password = await this.hashPassword(data.password);
    const account = new Account();
    account.id;
    account.email = data.email;
    account.username = data.username;
    account.password = password;
    account.isActive = data.isActive;

    return await this.accountRepository.save(account);
  }
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
