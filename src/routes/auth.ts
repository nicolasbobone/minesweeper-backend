import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { tryCatch } from '../middleware/try-catch';
import { AuthSchema } from '../schemas/auth';

const router = Router();

router.post('/register', tryCatch(AuthController.register, AuthSchema.register()));
router.post('/login', tryCatch(AuthController.login, AuthSchema.login()));

export { router };
