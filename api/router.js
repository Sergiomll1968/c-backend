import Router from 'express';
import countriesRouter from './countries/countries.router.js';

const router = Router();

router.use('/countries', countriesRouter);

export default router;
