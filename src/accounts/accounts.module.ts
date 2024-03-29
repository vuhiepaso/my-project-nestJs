import { Module } from '@nestjs/common';
import { AccountsController } from './controllner/accounts/accounts.controller';
import { AccountsService } from './service/accounts/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'entity/account';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
