
import mongoose from 'mongoose';
import Admin from '../models/users/AdminModel';
import dotenv from 'dotenv';
import path from 'path';

// Adjust path as needed based on where you run it from
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

async function resetAdminPassword() {
    try {
        console.log('Connecting to MongoDB...', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');

        const email = 'admin@atoz.com';
        const newPassword = 'admin987';

        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log(`Admin with email ${email} not found. Creating one...`);
            await Admin.create({
                username: 'Super Admin',
                email,
                password: newPassword,
                role: 'Admin',
                profile: {
                    name: 'System Administrator',
                    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
                }
            });
            console.log(`Admin created with password: ${newPassword}`);
        } else {
            console.log(`Admin found. Resetting password for ${email}...`);
            admin.password = newPassword;
            await admin.save(); // This triggers the pre-save hook to hash the password
            console.log(`Password reset successfully to: ${newPassword}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

resetAdminPassword();
