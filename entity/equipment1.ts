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

  constructor(
    id?: number,
    id_user?: number,
    name?: string,
    isActive?: boolean,
    status?: boolean,
    createDate?: Date,
    deleteDate?: Date,
  ) {
    this.id = id;
    this.id_user = id_user;
    this.name = name;
    this.isActive = isActive;
    this.status = status;
    this.createDate = createDate;
    this.deleteDate = deleteDate;
  }
}
