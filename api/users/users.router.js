import Router from 'express';
import * as usersController from './users.controller.js';
import users from './users.database.js';

const router = Router();

router.get('/all', usersController.getAll);
router.get('/:id', usersController.getId);
router.get('/boss/:id', usersController.getBoss);

router.post('/', usersController.addNew);

router.put('/:id', usersController.replace);

router.patch('/:id', usersController.modify);
router.patch('/delete/:id', usersController.logicDelete);

router.delete('/:id', usersController.hardDelete);

export default router;
