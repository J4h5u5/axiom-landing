import express from 'express';
import { getAllUsers, createUser, addReferral, getUser } from '../controllers/userController';
import { login, protect } from '../controllers/authController/authController';

export const userRouter = express.Router();

userRouter.route('/')
  .get(protect, getAllUsers);

userRouter.post('/login', login);

userRouter.route('/:id')
  .get(getUser)
  .patch(protect, addReferral);
