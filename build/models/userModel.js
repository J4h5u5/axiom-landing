"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=userModel.js.map