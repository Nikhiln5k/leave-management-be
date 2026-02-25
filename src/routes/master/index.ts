import { Router } from 'express';
import login from './login';
import user from './user';

const router = Router();

router.use('/login', login);
router.use('/user', user);

export default router;