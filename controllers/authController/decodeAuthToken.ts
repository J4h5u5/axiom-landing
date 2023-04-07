import { AccessData, ITgUserData, checkTgTokenAndGetAccessToken } from "./checkTgTokenAndGetAccessToken";

export const decodeAuthToken = (authToken: string): AccessData => {
    const decodedToken = Buffer.from(authToken, 'base64');

    const userData: ITgUserData = JSON.parse(decodedToken.toString());

    return checkTgTokenAndGetAccessToken(userData);
}