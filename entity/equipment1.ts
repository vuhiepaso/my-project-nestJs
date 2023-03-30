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

  @Column({ default: 'Equipment' })
  name: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
