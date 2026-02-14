import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string): string => {
    const token = jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '30d' }
    );
    return token;
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    } catch (error) {
        return null;
    }
};
