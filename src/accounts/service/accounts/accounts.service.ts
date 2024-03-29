import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'entity/account';
import { Repository } from 'typeorm';
import { hashWord } from 'common/service/hash.code';
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async findAccounts(): Promise<Account[]> {
    const queryBuilder = this.accountRepository.createQueryBuilder('account');
    queryBuilder.select([
      'account.username',
      'account.email',
      'account.isActive',
    ]);
    queryBuilder.where('account.isActive = :isActive', { isActive: true });
    return queryBuilder.getMany();
    // return await this.accountRepository.find();
  }
  async finByEmail(email: string): Promise<Account[]> {
    return await this.accountRepository.findBy({ email: email });
  }

  async createAccounts(data: Account): Promise<Account> {
    data.password = await hashWord(data.password);
    return await this.accountRepository.save(data);
  }
}
