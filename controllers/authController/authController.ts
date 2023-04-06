import { IUser, User } from '../../models/userModel';
import { AppError } from '../../utils/AppError';
import catchAsync from '../../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { checkTgTokenAndGetAccessToken } from './checkTgTokenAndGetAccessToken';
import { decodeAuthToken } from './decodeAuthToken';


const sendToken = (token: string, user: IUser, statusCode, res) => {
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

export const login = catchAsync(async (req, res, next) => {
    const { userData } = req.body;


    if (!userData) {
        return next(new AppError('Please provide telegram user data', 400));
    }

    const { isValid, accessToken, isOutdated, userId } = checkTgTokenAndGetAccessToken(userData);

    if (!isValid) {
        return next(new AppError('Data is NOT from Telegram', 400));
    }

    if (isOutdated) {
        return next(new AppError('Data is outdated', 400));
    }

    let user: IUser = await User.findOne({ referralId: userId });

    if(!user) {
        const userName = userData.username || `${userData.first_name} ${userData.last_name}`;
        user = await User.create({ userName, referralId: userId, createdAt: new Date()  });
    }

    sendToken(accessToken, user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const { userId, isOutdated } = decodeAuthToken(token);

    const currentUser = await User.find({ referralId: userId });
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    if (isOutdated) {
        return next(new AppError('Data is outdated', 400));
    }

    req.user = currentUser;
    next();
});
