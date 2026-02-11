import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string): string => {
    const token = jwt.sign(
        { userId, role },
        process.env.JWT_SECRET || 'supersecretkey123',
        { expiresIn: '30d' }
    );
    return token;
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123');
    } catch (error) {
        return null;
    }
};
