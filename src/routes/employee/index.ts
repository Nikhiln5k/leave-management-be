import { Router } from 'express';
import login from './login';
import leaves from './leaves';

const router = Router();

router.use('/login', login);
router.use('/leave', leaves);

export default router;