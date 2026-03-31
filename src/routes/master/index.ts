import { Router } from 'express';
import login from './login';
import user from './user';
import dashboard from './dashboard';

const router = Router();

router.use('/login', login);
router.use('/user', user);
router.use('/dashboard', dashboard);

export default router;