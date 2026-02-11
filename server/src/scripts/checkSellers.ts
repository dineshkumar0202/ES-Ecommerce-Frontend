
import mongoose from 'mongoose';
import Seller from '../models/users/SellerModel';
import dotenv from 'dotenv';
import path from 'path';

// Adjust path as needed based on where you run it from
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

async function checkSellers() {
    try {
        console.log('Connecting to MongoDB...', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');

        console.log('\n--- Existing Sellers in Database ---');
        const allSellers = await Seller.find({});
        if (allSellers.length === 0) {
            console.log('No sellers found in database.');
        } else {
            console.log(`Found ${allSellers.length} seller(s):`);
            allSellers.forEach((seller, index) => {
                console.log(`  ${index + 1}. Username: ${seller.username}`);
                console.log(`     Email: ${seller.email}`);
                console.log(`     Mobile: ${seller.mobile}`);
                console.log(`     UniqueID: ${seller.uniqueId}`);
                console.log(`     IsVerified: ${seller.isVerified}`);
                console.log(`     ID: ${seller._id}`);
            });
        }

        // Create a test seller if requested
        // Create or update a test seller (Always run this for now to fix user issue)
        const testEmail = 'seller@atoz.com';
        let testSeller = await Seller.findOne({ email: testEmail });

        if (!testSeller) {
            console.log('\n--- Creating Test Seller ---');
            try {
                testSeller = await Seller.create({
                    username: 'Test Seller',
                    email: testEmail,
                    mobile: '9876543210',
                    password: 'password123',
                    uniqueId: 'SLR1234',
                    role: 'Seller',
                    businessDetails: {
                        gstin: '29ABCDE1234F1Z5',
                        pan: 'ABCDE1234F'
                    },
                    isVerified: true
                });
                console.log(`Created new seller with ID: ${testSeller._id}`);
            } catch (err: any) {
                console.log('Error creating seller:', err.message);
                if (err.message.includes('mobile_1')) {
                    console.log('Mobile 9876543210 already in use. Finding owner...');
                    testSeller = await Seller.findOne({ mobile: '9876543210' });
                    if (testSeller) {
                        console.log(`Found owner: ${testSeller.username} (${testSeller.email})`);
                        console.log('Updating validation and password for this user instead...');
                        testSeller.password = 'password123';
                        testSeller.isVerified = true;
                        await testSeller.save();
                    }
                }
            }
        } else {
            console.log('\n--- Updating Test Seller Password ---');
            testSeller.password = 'password123';
            testSeller.isVerified = true;
            await testSeller.save();
            console.log(`Updated existing seller ${testSeller._id}`);
        }

        if (testSeller) {
            console.log(`\n*** Test Seller Credentials ***`);
            console.log(`  Email: ${testSeller.email || 'N/A'}`);
            console.log(`  Password: password123`);
            console.log(`  Unique ID: ${testSeller.uniqueId}`);
            console.log(`  Mobile: ${testSeller.mobile}`);
        }

        console.log('\n--- process complete ---');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkSellers();
