import { Module } from '@nestjs/common';
import { LoginController } from './controller/login/login.controller';
import { LoginService } from './service/login/login.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AccountsModule,
    JwtModule.register({
      secret: process.env.KEY_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
