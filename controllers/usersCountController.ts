import { User } from "../models/userModel";

export const getUsersCount = async (req, res) => {
    const usersCount = await User.countDocuments();
    try {
        res.status(200).json({
            status: 'success',
            data: {
                usersCount
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};