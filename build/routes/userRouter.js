"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController/authController");
exports.userRouter = express_1.default.Router();
exports.userRouter.route('/')
    .get(authController_1.protect, userController_1.getAllUsers);
exports.userRouter.post('/login', authController_1.login);
exports.userRouter.route('/:id')
    .get(authController_1.protect, userController_1.getUser)
    .patch(authController_1.protect, userController_1.addReferral);
//# sourceMappingURL=userRouter.js.map