import { User } from '../models/userModel';

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    try {
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

export const getUser = async (req, res) => {
    const users = await User.find({ referralId: req.params.id });
    try {
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

export const addReferral = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { referralId: req.params.id },
            { $push: { referrals: req.body } },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
