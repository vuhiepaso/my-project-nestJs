import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';

@Entity()
export class Equipment1 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'id-user is required' })
  id_user: number;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
