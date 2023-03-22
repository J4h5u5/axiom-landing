"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReferral = exports.createUser = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const getAllUsers = async (req, res) => {
    const users = await userModel_1.User.find();
    try {
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await userModel_1.User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.createUser = createUser;
const addReferral = async (req, res) => {
    try {
        await userModel_1.User.findOneAndUpdate({ referralId: req.params.id }, { $push: { referrals: req.body } }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success'
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.addReferral = addReferral;
//# sourceMappingURL=userController.js.map