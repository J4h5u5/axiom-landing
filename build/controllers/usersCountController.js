"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersCount = void 0;
const userModel_1 = require("../models/userModel");
const getUsersCount = async (req, res) => {
    const usersCount = await userModel_1.User.countDocuments();
    try {
        res.status(200).json({
            status: 'success',
            data: {
                usersCount
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
exports.getUsersCount = getUsersCount;
//# sourceMappingURL=usersCountController.js.map