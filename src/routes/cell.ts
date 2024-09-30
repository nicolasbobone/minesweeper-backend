import { Router } from 'express';
import { CellController } from '../controllers/cell';
import { tryCatch } from '../middleware/try-catch';
import { CellSchema } from '../schemas/cell';

const router = Router();

router.post('/', tryCatch(CellController.getAll, CellSchema.getAll()));
router.get('/:id', tryCatch(CellController.getById, CellSchema.get()));
router.put('/', tryCatch(CellController.update, CellSchema.update()));
router.delete('/:id', tryCatch(CellController.delete, CellSchema.delete()));

export { router };
