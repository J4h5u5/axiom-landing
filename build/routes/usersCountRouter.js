"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCountRouter = void 0;
const express_1 = __importDefault(require("express"));
const usersCountController_1 = require("../controllers/usersCountController");
exports.usersCountRouter = express_1.default.Router();
exports.usersCountRouter.route('/')
    .get(usersCountController_1.getUsersCount);
//# sourceMappingURL=usersCountRouter.js.map