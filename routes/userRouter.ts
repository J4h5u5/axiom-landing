import express from 'express';
import { getAllUsers, createUser, addReferral, getUser } from '../controllers/userController';
import { signup, login, protect } from '../controllers/authController';

export const userRouter = express.Router();

userRouter.route('/')
  .get(protect, getAllUsers);

userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.route('/:id')
  .get(getUser)
  .patch(protect, addReferral);
