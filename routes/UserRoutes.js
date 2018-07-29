import express from 'express';
import userController from '../controllers/userController';
import {
  emailValidator,
  existUserValidation,
  idObjectValidator,
  usernameValidator
} from '../validator/uniqueValidator';

const router = express.Router();

router.get('/users', (request, response) => {
  userController.getAll(request, response);
});

router.post('/users', usernameValidator, emailValidator, (request, response) => {
  userController.add(request, response);
});

router.put(
  '/users/:id',
  idObjectValidator,
  existUserValidation,
  usernameValidator,
  emailValidator,
  (request, response) => {
    userController.update(request, response);
  },
);

router.get('/users/:id', idObjectValidator, existUserValidation, (request, response) => {
  userController.findOne(request, response);
});

router.delete('/users/:id', idObjectValidator, existUserValidation, (request, response) => {
  userController.delete(request, response);
});

export default router;
