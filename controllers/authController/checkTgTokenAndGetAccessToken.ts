import { createHmac, createHash } from 'crypto';

const TG_AUTH_SESSION = 86400;

export interface ITgUserData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
}

export interface AccessData {
    isValid: boolean;
    isOutdated: boolean;
    accessToken: string;
    userId: string;
}

export const checkTgTokenAndGetAccessToken = (userData: ITgUserData): AccessData => {
    const SECRET = process.env.TG_SECRET;
    const secret = createHash('sha256').update(SECRET).digest();

    const { hash, ...data } = userData;

    const arr = Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`
    })

    arr.sort((a, b) => a.localeCompare(b));

    const str = arr.join("\n");

    const _hash = createHmac('sha256', secret)
        .update(str)
        .digest('hex');


    return {
        isValid: _hash === hash,
        isOutdated: (Date.now() / 1000) - userData.auth_date > TG_AUTH_SESSION,
        accessToken: Buffer.from(JSON.stringify(userData)).toString('base64'),
        userId: userData.id.toString()
    }
}