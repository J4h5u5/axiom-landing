import express from "express";
import { getUsersCount } from "../controllers/usersCountController";

export const usersCountRouter = express.Router();

usersCountRouter.route('/')
    .get(getUsersCount);