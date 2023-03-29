import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { USER } from 'common/role';
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

  @Column({ default: USER })
  role: string;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
