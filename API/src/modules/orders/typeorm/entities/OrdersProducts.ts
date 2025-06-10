import Product from "@modules/products/typeorm/entities/Product";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";

@Entity('orders_products')
export default class OrderProducts{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=> Order, order => order.orders_products)
  @JoinColumn({name: 'order_id'}) //colocar em Order
  order: Order;
  @ManyToOne(()=> Product, product => product.order_products)
  @JoinColumn({name: 'product_id'}) //colocar em Product
  product: Product;
  @Column()
  order_id: string;
  @Column()
  product_id: string;
  @Column('decimal')
  price: number;
  @Column('int')
  quantity: number;
  @Column()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

}
