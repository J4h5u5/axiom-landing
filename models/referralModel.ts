import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A user must have a name'],
            unique: true
        },
        referralToken: {
            type: String,
        }
    }
)

export const Referral = mongoose.model('Referral', referralSchema);