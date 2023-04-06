import mongoose from "mongoose";


export interface IUser extends mongoose.Document {
    userName: string;
    referralId: string;
    referrals: IUser[];
    createdAt: Date;
    miles: string[];
}

const userSchema = new mongoose.Schema<IUser>(
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
            type: [{
                userName: String,
                id: String
            }]
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        miles: {
            type: [Number],
            default: []
        }
    }
)

export const User = mongoose.model('User', userSchema);