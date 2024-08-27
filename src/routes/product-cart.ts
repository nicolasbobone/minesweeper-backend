import { Router } from 'express';
import { ProductCartController } from '../controllers/product-cart';
import { tryCatch } from '../middleware/try-catch';
import { ProductCartSchema } from '../schemas/product-cart';

const router = Router();

router.get('/', tryCatch(ProductCartController.getAll));
router.get('/:id', tryCatch(ProductCartController.getById, ProductCartSchema.get()));
router.post('/', tryCatch(ProductCartController.create, ProductCartSchema.create()));
router.put('/:id', tryCatch(ProductCartController.update, ProductCartSchema.update()));
router.delete('/:id', tryCatch(ProductCartController.delete, ProductCartSchema.delete()));

export { router };
