"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dayjs_1 = __importDefault(require("dayjs"));
const app_1 = require("../app");
const dayOfYear_1 = __importDefault(require("dayjs/plugin/dayOfYear"));
dayjs_1.default.extend(dayOfYear_1.default);
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
        type: Number,
        default: 0
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    }
});
userSchema.methods.addMiles = function (milesType) {
    if (milesType === 'login') {
        const lastLoginDate = (0, dayjs_1.default)(this.lastLoginAt).dayOfYear();
        this.lastLoginAt = new Date();
        if (lastLoginDate === (0, dayjs_1.default)().dayOfYear()) {
            return;
        }
    }
    this.miles = this.miles + app_1.milesConfig[milesType];
};
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=userModel.js.map