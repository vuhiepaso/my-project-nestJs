import { Module } from '@nestjs/common';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './service/login/login.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AccountsModule,
    JwtModule.register({
      secret: 'mysecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
