"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.login = void 0;
const userModel_1 = require("../../models/userModel");
const AppError_1 = require("../../utils/AppError");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const checkTgTokenAndGetAccessToken_1 = require("./checkTgTokenAndGetAccessToken");
const decodeAuthToken_1 = require("./decodeAuthToken");
const app_1 = require("../../app");
const sendToken = (token, user, statusCode, res) => {
    // const cookieOptions = {
    //     expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure: false,
    // };
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    // res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const { userData } = req.body;
    if (!userData) {
        return next(new AppError_1.AppError('Please provide telegram user data', 400));
    }
    const { isValid, accessToken, isOutdated, userId } = (0, checkTgTokenAndGetAccessToken_1.checkTgTokenAndGetAccessToken)(userData);
    if (!isValid) {
        return next(new AppError_1.AppError('Data is NOT from Telegram', 400));
    }
    if (isOutdated) {
        return next(new AppError_1.AppError('Data is outdated', 400));
    }
    let user = await userModel_1.User.findOne({ referralId: userId });
    if (!user) {
        const userName = userData.username || `${userData.first_name} ${userData.last_name}`;
        user = await userModel_1.User.create({
            userName,
            referralId: userId,
            createdAt: new Date(),
            miles: app_1.milesConfig.registration
        });
        user.addMiles('registration');
    }
    else {
        user.addMiles('login');
    }
    user.save();
    sendToken(accessToken, user, 200, res);
});
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError_1.AppError('You are not logged in! Please log in to get access.', 401));
    }
    const { userId, isOutdated } = (0, decodeAuthToken_1.decodeAuthToken)(token);
    const currentUser = await userModel_1.User.find({ referralId: userId });
    if (!currentUser) {
        return next(new AppError_1.AppError('The user belonging to this token does no longer exist.', 401));
    }
    if (isOutdated) {
        return next(new AppError_1.AppError('Data is outdated', 400));
    }
    req.user = currentUser;
    next();
});
//# sourceMappingURL=authController.js.map