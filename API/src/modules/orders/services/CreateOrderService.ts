import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomerRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

interface IProduct {
	id: string;
	quantity: number;
}
interface IRequest {
	customer_id: string;
	products: IProduct[];
}

export default class CreateOrderService {
	public async execute({ customer_id, products }: IRequest): Promise<Order> {
		const ordersRepository = getCustomRepository(OrdersRepository);
		const customerRepository = getCustomRepository(CustomersRepository);
		const productRepository = getCustomRepository(ProductRepository);

		const customerExist = await customerRepository.findById(customer_id);
		if (!customerExist) {
			throw new AppError("Could not find any customer with the given id");
		}

		const existsProducts = await productRepository.findAllByIds(products);
		if (!existsProducts.length) {
			throw new AppError("Could not find any products with the given id");
		}

		const existsProductsIds = existsProducts.map((product) => product.id);
		const checkInexistentProduct = products.filter(
			(product) => !existsProductsIds.includes(product.id)
		);
		if (!existsProductsIds.length) {
			throw new AppError(
				`Could not find product ${checkInexistentProduct[0].id}`
			);
		}

		const quantityAvailabe = products.filter(
			(product) =>
				existsProducts.filter((prod) => prod.id === product.id)[0]
					.quantity < product.quantity
		);
		if (quantityAvailabe.length) {
			throw new AppError(
				`The quantity ${quantityAvailabe[0].quantity} is not available for ${quantityAvailabe[0].id}`
			);
		}

		const serializerProducts = products.map((product) => ({
			product_id: product.id,
			quantity: product.quantity,
			price: existsProducts.filter((prod) => prod.id === product.id)[0]
				.price,
		}));
		const order = await ordersRepository.createOrder({
			customer: customerExist,
			products: serializerProducts,
		});

		const { orders_products } = order;
		const updateProductQuantity = orders_products.map((product) => ({
			id: product.product_id,
			quantity:
				existsProducts.filter((p) => p.id === product.product_id)[0]
					.quantity - product.quantity,
		}));
		await productRepository.save(updateProductQuantity);
		return order;
	}
}