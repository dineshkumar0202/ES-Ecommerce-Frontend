import User from '../../models/users/UserModel';
import Buyer from '../../models/users/BuyerModel';
import Seller from '../../models/users/SellerModel';
import Admin from '../../models/users/AdminModel';
import Otp from '../../models/users/OtpModel';
import EmailService from '../EmailService';
import jwt from 'jsonwebtoken';

import crypto from 'crypto';

class AuthService {
    private normalizeMobile(mobile?: string): string | undefined {
        if (!mobile) return undefined;
        const digits = String(mobile).replace(/\D/g, '');
        if (!digits) return undefined;
        return digits.slice(-10);
    }

    private async findExistingByMobileOrEmail(mobile?: string, email?: string) {
        const checks: Promise<any>[] = [];
        const normalizedMobile = this.normalizeMobile(mobile);
        const normalizedEmail = email?.trim().toLowerCase();

        if (normalizedMobile) {
            checks.push(User.findOne({ mobile: normalizedMobile }).select('_id'));
            checks.push(Buyer.findOne({ mobile: normalizedMobile }).select('_id'));
            checks.push(Seller.findOne({ mobile: normalizedMobile }).select('_id'));
        }

        if (normalizedEmail) {
            checks.push(User.findOne({ email: normalizedEmail }).select('_id'));
            checks.push(Buyer.findOne({ email: normalizedEmail }).select('_id'));
            checks.push(Seller.findOne({ email: normalizedEmail }).select('_id'));
            checks.push(Admin.findOne({ email: normalizedEmail }).select('_id'));
        }

        if (!checks.length) return null;
        const results = await Promise.all(checks);
        return results.find(Boolean) || null;
    }

    private async findUserAcrossCollections(loginData: any) {
        const normalizedMobile = this.normalizeMobile(loginData.mobile);
        const normalizedEmail = loginData.email ? String(loginData.email).trim().toLowerCase() : undefined;
        const query = normalizedEmail ? { email: normalizedEmail } : normalizedMobile ? { mobile: normalizedMobile } : null;
        if (!query) return null;

        let user: any = await User.findOne(query);
        if (!user) user = await Buyer.findOne(query);
        if (!user) user = await Seller.findOne(query);
        if (!user && normalizedEmail) user = await Admin.findOne(query);
        return user;
    }

    private async generateUniqueSellerId(): Promise<string> {
        for (let i = 0; i < 10; i++) {
            const candidate = `SLR${Math.floor(1000 + Math.random() * 9000)}`;
            const exists = await Seller.findOne({ uniqueId: candidate }).select('_id');
            if (!exists) return candidate;
        }
        throw new Error('Unable to generate seller unique ID. Please try again.');
    }

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

        // console.log(`[OTP-DEBUG] Generated OTP for ${identifier}: ${otpCode}`);

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
            // console.log(`[OTP-MOCK] Sending SMS to ${identifier}: Your OTP is ${otpCode}`);
            return { message: 'OTP sent to mobile successfully (mock)', success: true };
        }
    }

    async verifyOtp(identifier: string, enteredOtp: string) {
        // console.log(`[OTP-DEBUG] Verifying OTP. Identifier: ${identifier}, OTP: ${enteredOtp}`);

        // Find OTP record
        const otpRecord = await Otp.findOne({ identifier, otp: enteredOtp });

        if (!otpRecord) {
            // console.log(`[OTP-DEBUG] OTP record not found for ${identifier} and ${enteredOtp}`);
            throw new Error('Invalid OTP or OTP expired');
        }

        // console.log(`[OTP-DEBUG] Found OTP Record:`, otpRecord);

        // Check expiry
        if (new Date() > otpRecord.expiresAt) {
            // console.log(`[OTP-DEBUG] OTP expired. Current: ${new Date()}, Expires: ${otpRecord.expiresAt}`);
            await Otp.deleteOne({ _id: otpRecord._id });
            throw new Error('OTP has expired');
        }

        // Mark as verified or just delete it if used once
        // For registration flow, we might want to keep it "verified" until registration consumes it?
        // Or we just consume it now and trust the caller.
        // Let's delete it to prevent reuse.
        await Otp.deleteOne({ _id: otpRecord._id });
        // console.log(`[OTP-DEBUG] OTP verified successfully for ${identifier}`);
        return { success: true, message: 'OTP verified successfully' };
    }

    // --- Buyer ---
    async registerBuyer(userData: any) {
        const { username, password } = userData;
        const mobile = this.normalizeMobile(userData.mobile);
        const email = userData.email ? String(userData.email).trim().toLowerCase() : undefined;
        if (!mobile) throw new Error('Valid mobile number is required');

        const existing = await this.findExistingByMobileOrEmail(mobile, email);
        if (existing) throw new Error('User with this mobile or email already exists');

        const buyer = await Buyer.create({
            username,
            mobile,
            password,
            email,
            role: 'Buyer',
            profile: {
                name: username
            }
        });

        // ... (rest of function)

        if (buyer) {
            return {
                _id: buyer._id,
                username: buyer.username,
                mobile: buyer.mobile,
                email: buyer.email,
                role: buyer.role,
                profile: buyer.profile || {},
                token: this.generateToken(buyer._id as string, 'Buyer'),
            };
        } else {
            throw new Error('Invalid buyer data');
        }
    }

    async loginBuyer(loginData: any) {
        const { password } = loginData;
        const email = loginData.email ? String(loginData.email).trim().toLowerCase() : undefined;
        const mobile = this.normalizeMobile(loginData.mobile);

        let buyer = null;

        if (email) {
            buyer = await Buyer.findOne({ email });
        } else if (mobile) {
            buyer = await Buyer.findOne({ mobile });
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
            profile: buyer.profile || {},
            token: this.generateToken(buyer._id as string, 'Buyer'),
        };
    }

    // --- Seller ---
    async registerSeller(userData: any) {
        const { username, password, businessDetails, bankDetails } = userData;
        const mobile = this.normalizeMobile(userData.mobile);
        const email = userData.email ? String(userData.email).trim().toLowerCase() : undefined;
        if (!mobile) throw new Error('Valid mobile number is required');

        const existing = await this.findExistingByMobileOrEmail(mobile, email);
        if (existing) throw new Error('User with this mobile or email already exists');

        const uniqueId = await this.generateUniqueSellerId();

        const seller = await Seller.create({
            username,
            mobile,
            password,
            email,
            uniqueId,
            role: 'Seller',
            profile: {
                name: username
            },
            businessDetails,
            bankDetails,
            isVerified: false // Default to false
        });

        if (seller) {
            // console.log("Seller Created Successfully:", seller._id);
            return {
                _id: seller._id,
                username: seller.username,
                mobile: seller.mobile,
                email: seller.email,
                uniqueId: seller.uniqueId,
                role: seller.role,
                profile: seller.profile || {},
                token: this.generateToken(seller._id as string, 'Seller'),
            };
        } else {
            throw new Error('Invalid seller data');
        }
    }

    async loginSeller(loginData: any) {
        const { mobile, email, uniqueId, password } = loginData;

        let seller = null;

        if (uniqueId) {
            seller = await Seller.findOne({ uniqueId: String(uniqueId).trim().toUpperCase() });
        } else if (email) {
            seller = await Seller.findOne({ email: String(email).trim().toLowerCase() });
        } else if (mobile) {
            const normalizedMobile = this.normalizeMobile(mobile);
            if (!normalizedMobile) throw new Error('Please provide valid mobile number');
            seller = await Seller.findOne({ mobile: normalizedMobile });
        } else {
            throw new Error('Please provide Unique ID, email or mobile number');
        }

        if (!seller) throw new Error('Seller not found');

        const isMatch = await seller.matchPassword(password);
        if (!isMatch) throw new Error('Password incorrect');

        return {
            _id: seller._id,
            username: seller.username,
            mobile: seller.mobile,
            email: seller.email,
            uniqueId: seller.uniqueId,
            role: seller.role,
            profile: seller.profile || {},
            token: this.generateToken(seller._id as string, 'Seller'),
        };
    }

    // --- Admin ---
    async loginAdmin(loginData: any) {
        const password = loginData.password;
        const email = loginData.email ? String(loginData.email).trim().toLowerCase() : undefined;
        if (!email || !password) throw new Error('Email and password required for admin login');

        const admin = await Admin.findOne({ email });
        if (!admin) throw new Error('Admin not found');

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            throw new Error('Password incorrect');
        }

        return {
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            profile: admin.profile || {},
            token: this.generateToken(admin._id as string, 'Admin'),
        };
    }

    // Legacy / Generic Support (Optional, redirects to specific based on role if provided)
    async registerUser(userData: any) {
        if (userData.role === 'Seller') return this.registerSeller(userData);
        return this.registerBuyer(userData);
    }

    async loginUser(loginData: any) {
        const { password } = loginData;
        if (!password) throw new Error('Password required');

        const user = await this.findUserAcrossCollections(loginData);
        if (!user) throw new Error('User not found');

        const isMatch = await user.matchPassword(password);
        if (!isMatch) throw new Error('Password incorrect');

        return {
            _id: user._id,
            username: user.username,
            mobile: user.mobile,
            email: user.email,
            role: user.role,
            profile: user.profile || {},
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
