import { Router } from 'express';
import OrigensController from '../controllers/OrigensController';
import isAuthenticated from '@shared/http/middlewares/IsAuthenticated';

const origensRouter = Router();
const origensController = new OrigensController();

// Aplica o middleware para todas as rotas de origens
origensRouter.use(isAuthenticated);

// Listar todas as origens
origensRouter.get('/', async (req, res, next) => {
  try {
    await origensController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Buscar uma origem pelo ID
origensRouter.get('/:id', async (req, res, next) => {
  try {
    await origensController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Criar nova origem
origensRouter.post('/', async (req, res, next) => {
  try {
    await origensController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Atualizar origem
origensRouter.put('/:id', async (req, res, next) => {
  try {
    await origensController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Deletar origem
origensRouter.delete('/:id', async (req, res, next) => {
  try {
    await origensController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Listar todos os campeões de uma origem
origensRouter.get('/:id/campeoes', async (req, res, next) => {
  try {
    await origensController.listCampeoesByOrigem(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Atualização parcial (PATCH)
origensRouter.patch('/:id', async (req, res, next) => {
  try {
    await origensController.partialUpdate(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default origensRouter;