import User, { IUser } from '../../models/users/UserModel';
import jwt from 'jsonwebtoken';

class AuthService {
    async registerUser(userData: any) {
        const { username, mobile, password, role, email } = userData;

        // Check if user exists by mobile
        const userExists = await User.findOne({ mobile });

        if (userExists) {
            throw new Error('User with this mobile number already exists');
        }

        // Create user
        const user = await User.create({
            username, // This is the Name
            mobile,
            password,
            role: role || 'Buyer', // Default to Buyer
            email
        });

        if (user) {
            return {
                _id: user._id,
                username: user.username,
                mobile: user.mobile,
                email: user.email,
                role: user.role,
                token: this.generateToken(user._id as string),
            };
        } else {
            throw new Error('Invalid user data');
        }
    }

    async loginUser(loginData: any) {
        const { mobile, email, password } = loginData;

        // Find user by mobile or email
        let query = {};
        if (email) {
            query = { email };
        } else if (mobile) {
            query = { mobile };
        } else {
            throw new Error('Please provide email or mobile number');
        }

        const user = await User.findOne(query);

        if (!user) {
            console.log(`Login failed: User not found for query:`, query);
            throw new Error('User not found');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log(`Login failed: Password mismatch for user: ${user.mobile}`);
            throw new Error('Password incorrect');
        }

        return {
            _id: user._id,
            username: user.username,
            mobile: user.mobile,
            email: user.email,
            role: user.role,
            token: this.generateToken(user._id as string),
        };
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
