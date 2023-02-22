import { Module } from '@nestjs/common';
import { AccountsController } from './controllner/accounts/accounts.controller';
import { AccountsService } from './service/accounts/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [TypeOrmModule.forFeature([Account])],
})
export class AccountsModule {}
