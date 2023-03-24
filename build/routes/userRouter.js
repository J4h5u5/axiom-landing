"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.userRouter = express_1.default.Router();
exports.userRouter.route('/')
    .get(userController_1.getAllUsers)
    .post(userController_1.createUser);
exports.userRouter.route('/:id')
    .get(userController_1.getUser)
    .patch(userController_1.addReferral);
//# sourceMappingURL=userRouter.js.map