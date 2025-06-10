import Customer from "@modules/customers/typeorm/entities/Customer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";
import OrderProducts from "./OrdersProducts";

@Entity('orders')
export default class Order{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=> Customer)
  @JoinColumn({name: 'customer_id'})
  customer: Customer;
  @OneToMany(()=> OrderProducts, orders_products => orders_products.order,{cascade: true,})
  orders_products: OrdersProducts[];
  @Column()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

}
