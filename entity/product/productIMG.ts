import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product';

@Entity()
export class ProductIMG {
  @PrimaryGeneratedColumn()
  img_id: number;

  @Column()
  @IsNotEmpty({ message: 'Product_id is required' })
  product_id: number;

  @ManyToOne(() => Product, (product) => product.photos)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  @IsNotEmpty({ message: 'Image name is required' })
  url: string;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
export interface IFProductIMG {
  img_id?: number;
  product_id: number;
  url: string;
  createDate?: Date;
  deleteDate?: Date;
  updateDate?: Date;
}
