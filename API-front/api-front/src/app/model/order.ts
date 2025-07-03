export default class Order {
    id?:string;
    customer_id:string;
    products: OrderProducts[];
}
export class OrderProducts{
    id:string;
    quantity:number;
}
