import { Router } from 'express';
import { SetupController } from '../controllers/setup';
import { tryCatch } from '../middleware/try-catch';
import { SetupSchema } from '../schemas/setup';

const router = Router();

router.get('/', tryCatch(SetupController.getUnique));
router.post('/', tryCatch(SetupController.createOrUpdate, SetupSchema.createOrUpdate()));
router.delete('/:id', tryCatch(SetupController.delete));

export { router };
