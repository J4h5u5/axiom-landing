import express from 'express';
import { getAllUsers, createUser, addReferral } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter.route('/:id')
  .patch(addReferral);
