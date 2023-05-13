import Router from 'express';
import * as usersController from './users.controller.js';
// import users from './users.database.js';

const router = Router();

router.get('/all', usersController.getAllActive);
router.get('/:id', usersController.getById);
router.get('/boss/:id', usersController.getBoss);

router.post('/', usersController.create);

router.put('/:id', usersController.replace);

router.patch('/:id', usersController.update);
router.patch('/delete/:id', usersController.logicDelete);

router.delete('/:id', usersController.hardDelete);

export default router;
