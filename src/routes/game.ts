import { Router } from 'express';
import { GameController } from '../controllers/game';
import { tryCatch } from '../middleware/try-catch';
import { GameSchema } from '../schemas/game';

const router = Router();

router.post('/', tryCatch(GameController.getAll, GameSchema.getAll()));
router.get('/:id', tryCatch(GameController.getById, GameSchema.get()));
router.post('/create', tryCatch(GameController.create));
router.put('/:id', tryCatch(GameController.update, GameSchema.update()));
router.delete('/:id', tryCatch(GameController.delete, GameSchema.delete()));

export { router };
