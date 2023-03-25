"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./routes/userRouter");
const usersCountRouter_1 = require("./routes/usersCountRouter");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
if (process.env.NODE_ENV === 'development') {
    exports.app.use((0, morgan_1.default)('dev'));
}
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static(`${__dirname}/public`));
exports.app.use('/api/v1/users', userRouter_1.userRouter);
exports.app.use('/api/v1/usersCount', usersCountRouter_1.usersCountRouter);
//# sourceMappingURL=app.js.map