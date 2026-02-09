import User from '../../models/users/UserModel';
import Buyer from '../../models/users/BuyerModel';
import Seller from '../../models/users/SellerModel';
import Admin from '../../models/users/AdminModel';
import Otp from '../../models/users/OtpModel';
import EmailService from '../EmailService';
import jwt from 'jsonwebtoken';

import crypto from 'crypto';

class AuthService {
    // --- OTP Management ---
    async generateAndSendOtp(identifier: string) {
        // identifier can be mobile or email
        // Generate secure 6 digit OTP
        const otpCode = crypto.randomInt(100000, 999999).toString();

        // Remove existing OTP for this identifier
        await Otp.deleteMany({ identifier });

        // Save new OTP (valid for 10 minutes)
        await Otp.create({
            identifier,
            otp: otpCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
            verified: false
        });

        console.log(`[OTP-DEBUG] Generated OTP for ${identifier}: ${otpCode}`);

        // Send OTP
        const isEmail = identifier.includes('@');
        if (isEmail) {
            try {
                await EmailService.sendOtp(identifier, otpCode);
                return { message: 'OTP sent to email successfully', success: true };
            } catch (error) {
                console.error('Failed to send email OTP', error);
                // In dev, we still return success with logged OTP
                return { message: 'Email service failed, but OTP logged (dev mode)', success: true, devOtp: otpCode };
            }
        } else {
            // Mock SMS sending
            console.log(`[OTP-MOCK] Sending SMS to ${identifier}: Your OTP is ${otpCode}`);
            return { message: 'OTP sent to mobile successfully (mock)', success: true };
        }
    }

    async verifyOtp(identifier: string, enteredOtp: string) {
        console.log(`[OTP-DEBUG] Verifying OTP. Identifier: ${identifier}, OTP: ${enteredOtp}`);

        // Find OTP record
        const otpRecord = await Otp.findOne({ identifier, otp: enteredOtp });

        if (!otpRecord) {
            console.log(`[OTP-DEBUG] OTP record not found for ${identifier} and ${enteredOtp}`);
            throw new Error('Invalid OTP or OTP expired');
        }

        console.log(`[OTP-DEBUG] Found OTP Record:`, otpRecord);

        // Check expiry
        if (new Date() > otpRecord.expiresAt) {
            console.log(`[OTP-DEBUG] OTP expired. Current: ${new Date()}, Expires: ${otpRecord.expiresAt}`);
            await Otp.deleteOne({ _id: otpRecord._id });
            throw new Error('OTP has expired');
        }

        // Mark as verified or just delete it if used once
        // For registration flow, we might want to keep it "verified" until registration consumes it?
        // Or we just consume it now and trust the caller.
        // Let's delete it to prevent reuse.
        await Otp.deleteOne({ _id: otpRecord._id });
        console.log(`[OTP-DEBUG] OTP verified successfully for ${identifier}`);
        return { success: true, message: 'OTP verified successfully' };
    }

    // --- Buyer ---
    async registerBuyer(userData: any) {
        const { username, mobile, password, email } = userData;

        const orConditions: any[] = [{ mobile }];
        if (email) orConditions.push({ email });

        const existingBuyer = await Buyer.findOne({ $or: orConditions });

        if (existingBuyer) {
            throw new Error('Buyer with this mobile or email already exists');
        }

        const buyer = await Buyer.create({
            username,
            mobile,
            password,
            email,
            role: 'Buyer'
        });

        // ... (rest of function)

        if (buyer) {
            return {
                _id: buyer._id,
                username: buyer.username,
                mobile: buyer.mobile,
                email: buyer.email,
                role: buyer.role,
                token: this.generateToken(buyer._id as string, 'Buyer'),
            };
        } else {
            throw new Error('Invalid buyer data');
        }
    }

    async loginBuyer(loginData: any) {
        const { mobile, email, password } = loginData;

        let buyer = null;

        if (email) {
            buyer = await Buyer.findOne({ email });
        } else if (mobile) {
            // Try multiple mobile number formats
            const cleanMobile = mobile.replace(/\D/g, ''); // Remove all non-digits

            // Build possible mobile number formats
            const possibleMobiles = [
                mobile, // Exact as entered
                cleanMobile, // Just digits
                `+91${cleanMobile}`, // With +91 prefix
                `+91${cleanMobile.slice(-10)}`, // +91 with last 10 digits
                cleanMobile.slice(-10), // Last 10 digits only
            ];

            // Try to find buyer with any of these formats
            buyer = await Buyer.findOne({ mobile: { $in: possibleMobiles } });
        } else {
            throw new Error('Please provide email or mobile number');
        }

        if (!buyer) throw new Error('Buyer not found');

        const isMatch = await buyer.matchPassword(password);
        if (!isMatch) throw new Error('Password incorrect');

        return {
            _id: buyer._id,
            username: buyer.username,
            mobile: buyer.mobile,
            email: buyer.email,
            role: buyer.role,
            token: this.generateToken(buyer._id as string, 'Buyer'),
        };
    }

    // --- Seller ---
    async registerSeller(userData: any) {
        console.log("Registering Seller:", userData);
        const { username, mobile, password, email } = userData;

        const orConditions: any[] = [{ mobile }];
        if (email) orConditions.push({ email });
        console.log("Seller Check Conditions:", orConditions);

        const existingSeller = await Seller.findOne({ $or: orConditions });

        if (existingSeller) {
            throw new Error('Seller with this mobile or email already exists');
        }

        const seller = await Seller.create({
            username,
            mobile,
            password,
            email,
            role: 'Seller'
        });

        if (seller) {
            console.log("Seller Created Successfully:", seller._id);
            return {
                _id: seller._id,
                username: seller.username,
                mobile: seller.mobile,
                email: seller.email,
                role: seller.role,
                token: this.generateToken(seller._id as string, 'Seller'),
            };
        } else {
            throw new Error('Invalid seller data');
        }
    }

    async loginSeller(loginData: any) {
        console.log("Login Seller Attempt:", loginData);
        const { mobile, email, password } = loginData;

        let seller = null;

        if (email) {
            console.log("Seller Login Query by email:", email);
            seller = await Seller.findOne({ email });
        } else if (mobile) {
            // Try multiple mobile number formats
            const cleanMobile = mobile.replace(/\D/g, ''); // Remove all non-digits
            console.log("Seller Login - Clean mobile:", cleanMobile);

            // Build possible mobile number formats
            const possibleMobiles = [
                mobile, // Exact as entered
                cleanMobile, // Just digits
                `+91${cleanMobile}`, // With +91 prefix
                `+91${cleanMobile.slice(-10)}`, // +91 with last 10 digits
                cleanMobile.slice(-10), // Last 10 digits only
            ];

            console.log("Seller Login - Trying mobiles:", possibleMobiles);

            // Try to find seller with any of these formats
            seller = await Seller.findOne({ mobile: { $in: possibleMobiles } });

            if (!seller) {
                console.log("Seller Not Found via any mobile format");
            }
        } else {
            throw new Error('Please provide email or mobile number');
        }

        if (!seller) {
            console.log("Seller Not Found");
            throw new Error('Seller not found');
        }

        console.log("Seller Found:", seller.username, "Mobile:", seller.mobile);

        const isMatch = await seller.matchPassword(password);
        if (!isMatch) throw new Error('Password incorrect');

        return {
            _id: seller._id,
            username: seller.username,
            mobile: seller.mobile,
            email: seller.email,
            role: seller.role,
            token: this.generateToken(seller._id as string, 'Seller'),
        };
    }

    // --- Admin ---
    async loginAdmin(loginData: any) {
        console.log("Login Admin Attempt:", loginData.email);
        const { email, password } = loginData;
        if (!email || !password) throw new Error('Email and password required for admin login');

        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("Admin not found for email:", email);
            throw new Error('Admin not found');
        }

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            console.log("Admin password mismatch for email:", email);
            throw new Error('Password incorrect');
        }

        console.log("Admin login successful:", admin.username);

        return {
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            token: this.generateToken(admin._id as string, 'Admin'),
        };
    }

    // Legacy / Generic Support (Optional, redirects to specific based on role if provided)
    async registerUser(userData: any) {
        if (userData.role === 'Seller') return this.registerSeller(userData);
        return this.registerBuyer(userData);
    }

    async loginUser(loginData: any) {
        // Legacy login: try to find in User (old) or try to identify role?
        // For now, let's keep the old User model logic as fallback or primary if referenced
        // But the user requested NEW structure.
        // I'll keep the original implementation for `loginUser` using `User` model to avoid breaking existing clients immediately,
        // unless I update the client.
        // But wait, the user wants me to implement distinct login/registers.

        // I'll leave the old loginUser pointing using the old User model for safety, 
        // but I'll add the new methods above.
        // Actually, I'll update loginUser to search across models or I'll just rely on the new specific methods.
        // Let's implement a 'smart' login that checks all if no role specified?
        // No, explicit is better. I will just keep the old one for the old endpoint.

        const { mobile, email, password } = loginData;
        let query = {};
        if (email) query = { email };
        else if (mobile) query = { mobile };
        else throw new Error('Please provide email or mobile number');

        const user = await User.findOne(query);
        if (!user) throw new Error('User not found');

        const isMatch = await user.matchPassword(password);
        if (!isMatch) throw new Error('Password incorrect');

        return {
            _id: user._id,
            username: user.username,
            mobile: user.mobile,
            email: user.email,
            role: user.role,
            token: this.generateToken(user._id as string, user.role),
        };
    }

    async getUserProfile(userId: string) {
        // Try all models?
        let user: any = await User.findById(userId).select('-password');
        if (!user) user = await Buyer.findById(userId).select('-password');
        if (!user) user = await Seller.findById(userId).select('-password');
        if (!user) user = await Admin.findById(userId).select('-password');
        return user;
    }

    private generateToken(id: string, role: string): string {
        return jwt.sign({ id, role }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '30d',
        });
    }
}

export default new AuthService();
