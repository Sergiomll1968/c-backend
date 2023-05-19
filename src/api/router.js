import Router from 'express';
import countriesRouter from './countries/countries.router.js';
import usersRouter from './users/users.router.js';
import * as authController from './auth/auth.controller.js';

const router = Router();

router.use('/countries', countriesRouter);
router.use('/users', usersRouter);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
