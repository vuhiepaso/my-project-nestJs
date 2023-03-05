import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง~\[\]\|\\?\/]).{8,}$/;

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(REGEX_PASSWORD, {
    message:
      'The password must meet the following requirements: at least 8 characters, including at least 1 lowercase letter, 1 uppercase letter, and 1 special character.',
  })
  @Column()
  password: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
