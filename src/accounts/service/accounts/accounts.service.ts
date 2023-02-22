import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account';
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
    return await this.accountRepository.save(data);
  }
}
