import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  msv: number;

  @Column({ length: 250 })
  name: string;

  @Column()
  age: number;

  @Column({ length: 500 })
  address: string;
}
