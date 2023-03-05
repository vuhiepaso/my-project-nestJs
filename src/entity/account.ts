import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
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
