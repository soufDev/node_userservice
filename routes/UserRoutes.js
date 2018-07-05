import express from 'express';
import UserController from '../controllers/User';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/users', (request, response) => {
  userController.getAll(request, response);
});

router.post('/users', (request, response) => {
  UserController.add(request, response);
});

router.put('/user/:id', (request, response) => {
  UserController.update(request, response);
});

router.get('/user/:param', (request, response) => {
  UserController.getOne(request, response);
});

router.delete('/user/:param', (request, response) => {
  UserController.deleteOne(request, response);
});

export default router;
