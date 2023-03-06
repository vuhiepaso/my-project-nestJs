import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'email is not empty' })
  email: string;

  @IsNotEmpty({ message: 'Password is not empty' })
  password: string;
}
