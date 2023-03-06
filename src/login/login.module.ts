import { Module } from '@nestjs/common';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './service/login/login.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AccountsModule],
  controllers: [LoginController],
  providers: [LoginService, JwtService],
})
export class LoginModule {}
