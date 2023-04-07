import mongoose, { Model } from "mongoose";
import dayjs from 'dayjs'
import { IMilesConfig } from '../interface';
import { milesConfig } from "../app";

import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear)


export interface IUser extends mongoose.Document {
    userName: string;
    referralId: string;
    referrals: IUser[];
    createdAt: Date;
    miles: number;
    lastLoginAt: Date;
}

interface IUserMethods {
    addMiles(milesType: keyof IMilesConfig): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
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
            type: Number,
            default: 0
        },
        lastLoginAt: {
            type: Date,
            default: Date.now()
        }
    }
)

userSchema.methods.addMiles = function(this: IUser, milesType: keyof IMilesConfig): void {
    if (milesType === 'login') {
        const lastLoginDate = dayjs(this.lastLoginAt).dayOfYear();
        this.lastLoginAt = new Date();
        if (lastLoginDate === dayjs().dayOfYear()) {
            return;
        }
    }
    this.miles = this.miles + milesConfig[milesType];
};

export const User = mongoose.model('User', userSchema);