"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTgTokenAndGetAccessToken = void 0;
const crypto_1 = require("crypto");
const TG_AUTH_SESSION = 86400;
const checkTgTokenAndGetAccessToken = (userData) => {
    const SECRET = process.env.TG_SECRET;
    const secret = (0, crypto_1.createHash)('sha256').update(SECRET).digest();
    const { hash, ...data } = userData;
    const arr = Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`;
    });
    arr.sort((a, b) => a.localeCompare(b));
    const str = arr.join("\n");
    const _hash = (0, crypto_1.createHmac)('sha256', secret)
        .update(str)
        .digest('hex');
    return {
        isValid: _hash === hash,
        isOutdated: (Date.now() / 1000) - userData.auth_date > TG_AUTH_SESSION,
        accessToken: Buffer.from(JSON.stringify(userData)).toString('base64'),
        userId: userData.id.toString()
    };
};
exports.checkTgTokenAndGetAccessToken = checkTgTokenAndGetAccessToken;
//# sourceMappingURL=checkTgTokenAndGetAccessToken.js.map