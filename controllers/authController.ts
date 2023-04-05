import { IUser, User } from '../models/userModel';
import { AppError } from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

//tgData
// {
//     "id": 83261137,
//     "first_name": "max",
//     "last_name": "axenov",
//     "username": "pussydog",
//     "photo_url": "https://t.me/i/userpic/320/zm9T80DVNxLcETsh7vDAffHswkUyl_xTMuWK_eaxUkU.jpg",
//     "auth_date": 1680705146,
//     "hash": "b16890e37e828a56b8aa9b6218537a03acbadd9814d38b8406210e9a48713d72"
// }

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user: IUser, statusCode, res) => {
    const token = signToken(user.referralId);
    const cookieOptions = {
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

export const signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
    });

    createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
    //todo check tg hash
    const user = await User.findOne({ referralId: req.body.referralId });
    createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please log in again.', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});
