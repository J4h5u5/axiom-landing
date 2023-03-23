import express from 'express';
import { getAllUsers, createUser, addReferral, getUser } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter.route('/:id')
  .get(getUser)
  .patch(addReferral);
