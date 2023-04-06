const SECRET = '6054114687:AAEqOlbvAPCQ5Rfdcif4ZArDbamsWa4YkvY'
import { createHmac, createHash } from 'crypto';

interface IUserData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
}

export const checkTgToken = (userData: IUserData): boolean => {
    const SECRET = process.env.TG_SECRET;
    const secret = createHash('sha256').update(SECRET).digest();

    const { hash, ...woHash } = userData;

    const arr = Object.entries(woHash).map(([key, value]) => {
        return `${key}=${value}`
    })

    arr.sort((a, b) => a.localeCompare(b));

    const str = arr.join("\n");

    // const hmacStr = hmac.update(str).digest('hex');

    const _hash = createHmac('sha256', secret)
        .update(str)
        .digest('hex');


    return _hash === hash;
}