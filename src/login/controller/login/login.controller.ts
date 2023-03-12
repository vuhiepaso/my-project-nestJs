import {
  Body,
  Controller,
  Post,
  UsePipes,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from 'src/login/login.dto';
import { AccountsService } from 'src/accounts/service/accounts/accounts.service';
import { validatePassword } from 'common/service/hash.code';
import { JwtService } from '@nestjs/jwt';
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('login')
export class LoginController {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}
  @Post()
  async login(@Body() data: LoginDto, @Response() res: any) {
    try {
      const account = await this.accountsService.finByEmail(data.email);
      const isPassword = account[0].password
        ? await validatePassword(data.password, account[0]?.password)
        : false;
      if (account.length <= 0 || isPassword === false) {
        return res.status(400).json({
          status: '400',
          message: `Email or password doesn't exist !`,
        });
      }
      const payload = {
        email: account[0].email,
        id: account[0].id,
        role: account[0].role,
      };
      const info = account[0];
      delete info.password;
      const token = this.jwtService.sign(payload, { expiresIn: '10h' });
      return res.status(200).json({
        status: '200',
        message: `Login successfully`,
        data: {
          info,
          token,
        },
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
