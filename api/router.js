import Router from 'express';
import countriesRouter from './countries/countries.router.js';
import usersRouter from './users/users.router.js';

const router = Router();

router.use('/countries', countriesRouter);
router.use('/users', usersRouter);

export default router;
