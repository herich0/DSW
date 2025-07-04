import { Router } from 'express';
import CampeoesController from '../controllers/CampeoesController';
import isAuthenticated from '@shared/http/middlewares/IsAuthenticated';

const campeoesRouter = Router();
const campeoesController = new CampeoesController();

// Aplica o middleware para todas as rotas de campeões
campeoesRouter.use(isAuthenticated);

// Listar todos os campeões
campeoesRouter.get('/', async (req, res, next) => {
  try {
    await campeoesController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Buscar campeão por ID
campeoesRouter.get('/:id', async (req, res, next) => {
  try {
    await campeoesController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Criar novo campeão
campeoesRouter.post('/', async (req, res, next) => {
  try {
    await campeoesController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Atualização completa (PUT)
campeoesRouter.put('/:id', async (req, res, next) => {
  try {
    await campeoesController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Atualização parcial (PATCH)
campeoesRouter.patch('/:id', async (req, res, next) => {
  try {
    await campeoesController.partialUpdate(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Deletar campeão
campeoesRouter.delete('/:id', async (req, res, next) => {
  try {
    await campeoesController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default campeoesRouter;