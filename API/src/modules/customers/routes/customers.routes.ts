import { Router } from "express";
import CustomersController from "../controllers/CustomersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import Joi from "joi";

const customersRouter = Router();
const customersController = new CustomersController();
customersRouter.use(isAuthenticated);

customersRouter.get("/", async (req, res, next) => {
	try {
		await customersController.index(req, res, next);
	} catch (err) {
		next(err);
	}
});
customersRouter.get(
	"/:id",
	celebrate({
		[Segments.PARAMS]: { id: Joi.string().uuid().required() },
	}),
	async (req, res, next) => {
		try {
			await customersController.show(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

customersRouter.post(
	"/",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
		},
	}),
	async (req, res, next) => {
		try {
			await customersController.create(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

customersRouter.put(
	"/:id",
	celebrate({
		[Segments.PARAMS]: { id: Joi.string().uuid().required() },
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
		},
	}),
	async (req, res, next) => {
		try {
			await customersController.update(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

customersRouter.delete(
	"/:id",
	celebrate({
		[Segments.PARAMS]: { id: Joi.string().uuid().required() },
	}),
	async (req, res, next) => {
		try {
			await customersController.delete(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

export default customersRouter;