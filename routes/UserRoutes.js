import express from 'express';
import UserController from '../controllers/User';
import userController from '../controllers/userController';
import { emailValidator, usernameValidator } from '../validator/uniqueValidator';

const router = express.Router();

router.get('/users', (request, response) => {
  userController.getAll(request, response);
});

router.post('/users', usernameValidator, emailValidator, (request, response) => {
  userController.add(request, response);
});

router.put('/user/:id', usernameValidator, emailValidator, (request, response) => {
  userController.update(request, response);
});

router.get('/user/:param', (request, response) => {
  UserController.getOne(request, response);
});

router.delete('/user/:param', (request, response) => {
  UserController.deleteOne(request, response);
});

export default router;
