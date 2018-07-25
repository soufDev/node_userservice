import express from 'express';
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

router.get('/user/:id', (request, response) => {
  userController.getOne(request, response);
});

router.delete('/user/:id', (request, response) => {
  userController.deleteOne(request, response);
});

export default router;
