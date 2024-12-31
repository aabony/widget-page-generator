import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key';

export interface DecodedToken {
    userId: string;
    email: string;
    role: string;
}

export function verifyToken(token: string): DecodedToken | null {
    try {
        const decoded = jwt.verify(token, SECRET) as DecodedToken;
        return decoded;
    } catch (error) {
        return null;
    }
}
