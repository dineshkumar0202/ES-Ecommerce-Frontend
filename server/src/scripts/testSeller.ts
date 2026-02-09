/**
 * Test Script: Create and verify a test seller in the database
 * Run: npx ts-node src/scripts/testSeller.ts
 */

import mongoose from 'mongoose';
import Seller from '../models/users/SellerModel';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

async function testSellerDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');

        // Check existing sellers
        console.log('\n--- Existing Sellers in Database ---');
        const allSellers = await Seller.find({}).select('username mobile email role createdAt');
        if (allSellers.length === 0) {
            console.log('No sellers found in database.');
        } else {
            console.log(`Found ${allSellers.length} seller(s):`);
            allSellers.forEach((seller, index) => {
                console.log(`  ${index + 1}. Username: ${seller.username}, Mobile: ${seller.mobile}, Email: ${seller.email || 'N/A'}`);
            });
        }

        // Create a test seller if none exists
        const testMobile = '9999999999';
        const testSeller = await Seller.findOne({ mobile: testMobile });

        if (!testSeller) {
            console.log('\n--- Creating Test Seller ---');
            const newSeller = await Seller.create({
                username: 'Test Seller',
                mobile: testMobile,
                password: 'password123', // Will be hashed by pre-save hook
                email: 'testseller@example.com',
                role: 'Seller'
            });
            console.log('Test Seller Created:');
            console.log(`  ID: ${newSeller._id}`);
            console.log(`  Username: ${newSeller.username}`);
            console.log(`  Mobile: ${newSeller.mobile}`);
            console.log(`  Email: ${newSeller.email}`);
            console.log('\n  *** Login Credentials ***');
            console.log('  Mobile: 9999999999');
            console.log('  Password: password123');
        } else {
            console.log('\n--- Test Seller Already Exists ---');
            console.log(`  ID: ${testSeller._id}`);
            console.log(`  Username: ${testSeller.username}`);
            console.log(`  Mobile: ${testSeller.mobile}`);
            console.log('\n  *** Login Credentials ***');
            console.log('  Mobile: 9999999999');
            console.log('  Password: password123');

            // Test password matching
            console.log('\n--- Testing Password Match ---');
            const isMatch = await testSeller.matchPassword('password123');
            console.log(`  Password 'password123' matches: ${isMatch}`);
        }

        console.log('\n--- Test Complete ---');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testSellerDatabase();
