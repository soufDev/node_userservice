import express from 'express';
import UserController from '../controllers/User';

const router = express.Router();

router.get('/users', (request, response) => {
  UserController.getAll(request, response);
});

router.post('/users', (request, response) => {
  UserController.add(request, response);
});

export default router;
