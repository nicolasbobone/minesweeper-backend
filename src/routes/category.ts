import { Router } from 'express';
import { CategoryController } from '../controllers/category';
import { tryCatch } from '../middleware/try-catch';
import { CategorySchema } from '../schemas/category';

const router = Router();

router.get('/', tryCatch(CategoryController.getAll));
router.get('/:id', tryCatch(CategoryController.getById, CategorySchema.get()));
router.post('/', tryCatch(CategoryController.create, CategorySchema.create()));
router.put('/:id', tryCatch(CategoryController.update, CategorySchema.update()));
router.delete('/:id', tryCatch(CategoryController.delete, CategorySchema.delete()));

export { router };
