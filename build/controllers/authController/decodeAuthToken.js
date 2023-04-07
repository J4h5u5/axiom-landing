"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAuthToken = void 0;
const checkTgTokenAndGetAccessToken_1 = require("./checkTgTokenAndGetAccessToken");
const decodeAuthToken = (authToken) => {
    const decodedToken = Buffer.from(authToken, 'base64');
    const userData = JSON.parse(decodedToken.toString());
    return (0, checkTgTokenAndGetAccessToken_1.checkTgTokenAndGetAccessToken)(userData);
};
exports.decodeAuthToken = decodeAuthToken;
//# sourceMappingURL=decodeAuthToken.js.map