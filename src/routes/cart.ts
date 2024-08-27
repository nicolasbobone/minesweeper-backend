import { Router } from 'express';
import { CartController } from '../controllers/cart';
import { tryCatch } from '../middleware/try-catch';
import { CartSchema } from '../schemas/cart';

const router = Router();

router.get('/', tryCatch(CartController.getAll));
router.get('/pending', tryCatch(CartController.getPending));
router.get('/:id', tryCatch(CartController.getById, CartSchema.get()));
router.post('/', tryCatch(CartController.create));
router.put('/:id', tryCatch(CartController.update, CartSchema.update()));
router.delete('/:id', tryCatch(CartController.delete, CartSchema.delete()));

export { router };
