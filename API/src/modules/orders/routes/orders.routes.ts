import { Router } from "express";
import OrdersController from "../controllers/OrdersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import Joi from "joi";

const ordersRouter = Router();
const ordersController = new OrdersController();
ordersRouter.use(isAuthenticated);

ordersRouter.get("/", async (req, res, next) => {
	try {
		await ordersController.index(req, res, next);
	} catch (error) {
		next(error);
	}
});
ordersRouter.get(
	"/:id",
	celebrate({
		[Segments.PARAMS]: { id: Joi.string().uuid().required() },
	}),
	async (req, res, next) => {
		try {
			await ordersController.show(req, res, next);
		} catch (error) {
			next(error);
		}
	}
);
ordersRouter.post(
	"/",
	celebrate({
		[Segments.BODY]: {
			customer_id: Joi.string().required(),
			products: Joi.required(),
		},
	}),
	async (req, res, next) => {
		await ordersController.create(req, res, next);
	}
);

export default ordersRouter;