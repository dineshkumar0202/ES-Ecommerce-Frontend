
import mongoose from 'mongoose';
import Admin from '../models/users/AdminModel';
import dotenv from 'dotenv';
import path from 'path';

// Adjust path as needed based on where you run it from
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://aestheticdinesh02_db_user:atoz@atoz.songs6i.mongodb.net/?appName=atoz';

async function resetAdminPassword() {
    try {
        console.log('Connecting to MongoDB...', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');

        const email = 'admin@atoz.com';
        const newPassword = 'admin987';

        const admin = await Admin.find({ email });

        if (admin.length === 0) {
            console.log(`Admin with email ${email} not found. Creating one...`);
            const created = await Admin.create({
                username: 'Super Admin',
                email,
                password: newPassword,
                role: 'Admin',
                profile: {
                    name: 'System Administrator',
                    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
                }
            });
            console.log(`Admin created with ID: ${created._id}`);
        } else {
            console.log(`Admin found (count=${admin.length}). Resetting password for ${email}...`);
            const targetAdmin = admin[0];
            targetAdmin.password = newPassword;
            await targetAdmin.save();
            console.log(`Password reset successfully for existing admin: ${targetAdmin._id}`);
        }

        console.log('DONE: Admin credentials ensured.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

resetAdminPassword();
