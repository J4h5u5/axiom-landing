import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: [true, 'User should have userName']
        },
        referralId: {
            type: String,
            unique: true,
            required: [true, 'User should have referralId']
        },
        referrals: {
            type: ['User']
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        }
    }
)

export const User = mongoose.model('User', userSchema);