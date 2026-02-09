/**
 * Test Script: Create and verify an admin user in the database
 * Run: npx ts-node src/scripts/createAdmin.ts
 */

import mongoose from 'mongoose';
import Admin from '../models/users/AdminModel';
import dotenv from 'dotenv';
import path from 'path';

// Adjust path as needed based on where you run it from
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

async function createAdminUser() {
    try {
        console.log('Connecting to MongoDB...', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');

        // Check existing admins
        console.log('\n--- Existing Admins in Database ---');
        const allAdmins = await Admin.find({}).select('username email role createdAt');
        if (allAdmins.length === 0) {
            console.log('No admins found in database.');
        } else {
            console.log(`Found ${allAdmins.length} admin(s):`);
            allAdmins.forEach((admin, index) => {
                console.log(`  ${index + 1}. Username: ${admin.username}, Email: ${admin.email}`);
            });
        }

        // Create a test admin if none exists
        const testEmail = 'admin@atoz.com';
        const testAdmin = await Admin.findOne({ email: testEmail });

        if (!testAdmin) {
            console.log('\n--- Creating Test Admin ---');
            const newAdmin = await Admin.create({
                username: 'Super Admin',
                email: testEmail,
                password: 'password123', // Will be hashed by pre-save hook
                role: 'Admin',
                profile: {
                    name: 'System Administrator',
                    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
                }
            });
            console.log('Test Admin Created:');
            console.log(`  ID: ${newAdmin._id}`);
            console.log(`  Username: ${newAdmin.username}`);
            console.log(`  Email: ${newAdmin.email}`);
            console.log('\n  *** Login Credentials ***');
            console.log(`  Email: ${testEmail}`);
            console.log('  Password: password123');
        } else {
            console.log('\n--- Test Admin Already Exists ---');
            console.log(`  ID: ${testAdmin._id}`);
            console.log(`  Username: ${testAdmin.username}`);
            console.log(`  Email: ${testAdmin.email}`);
            console.log('\n  *** Login Credentials ***');
            console.log(`  Email: ${testEmail}`);
            console.log('  Password: password123');
        }

        console.log('\n--- process complete ---');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

createAdminUser();
