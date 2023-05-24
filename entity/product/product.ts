import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductIMG } from './productIMG';

export interface IFProduct {
  category_id: number;
  name: string;
  price: number;
  quantity: number;
  describe?: string;
  overview?: string;
  isActive?: boolean;
}
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @OneToMany(() => ProductIMG, (image) => image.product)
  photos: ProductIMG[];

  @Column()
  // @IsNotEmpty({ message: 'Category_id is required' })
  category_id: number;

  @Column()
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  describe: string;

  @Column()
  overview: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
