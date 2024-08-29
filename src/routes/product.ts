import { Router } from 'express';
import { ProductController } from '../controllers/product';
import { tryCatch } from '../middleware/try-catch';
import { ProductSchema } from '../schemas/product';

const router = Router();

router.post('/', tryCatch(ProductController.getAll, ProductSchema.getAll()));
router.get('/:id', tryCatch(ProductController.getById, ProductSchema.get()));
router.post('/create', tryCatch(ProductController.create, ProductSchema.create()));
router.put('/:id', tryCatch(ProductController.update, ProductSchema.update()));
router.delete('/:id', tryCatch(ProductController.delete, ProductSchema.delete()));

export { router };
