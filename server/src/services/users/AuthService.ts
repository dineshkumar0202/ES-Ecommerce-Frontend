import User, { IUser } from '../../models/users/UserModel';
import jwt from 'jsonwebtoken';

class AuthService {
    async registerUser(userData: any) {
        const { username, email, password } = userData;
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new Error('User already exists');
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        if (user) {
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: this.generateToken(user._id as string),
            };
        } else {
            throw new Error('Invalid user data');
        }
    }

    async loginUser(loginData: any) {
        const { email, password } = loginData;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: this.generateToken(user._id as string),
            };
        } else {
            throw new Error('Invalid email or password');
        }
    }

    async getUserProfile(userId: string) {
        return await User.findById(userId).select('-password');
    }

    private generateToken(id: string): string {
        return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '30d',
        });
    }
}

export default new AuthService();
