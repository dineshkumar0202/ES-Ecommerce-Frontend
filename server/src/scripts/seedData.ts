import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Buyer from '../models/users/BuyerModel';
import Seller from '../models/users/SellerModel';
import Admin from '../models/users/AdminModel';
import Product from '../models/retail/ProductModel'; // Assuming ProductModel is in ../models/retail/ProductModel.ts or similar
// Wait, I need to check where ProductModel is. It was imported as ./src/routers/retail/ProductRouter in server.ts
// listing models/retail might help confirm location.

dotenv.config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('📦 Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        // We can keep User for legacy or clear it. Let's clear everything to be clean.
        // But need to import User if we want to clear it? Or just use mongoose.connection.dropCollection('users')?
        // Let's just focus on the new collections.
        await Buyer.deleteMany({});
        await Seller.deleteMany({});
        await Admin.deleteMany({});
        await Product.deleteMany({});

        // Create users
        console.log('👥 Creating users...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Admin
        const admin = await Admin.create({
            username: 'Admin User',
            email: 'admin@atoz.com',
            password: hashedPassword,
            role: 'Admin',
            profile: {
                name: 'Super Admin',
                avatar: 'https://via.placeholder.com/150'
            }
        });

        // Seller
        const seller = await Seller.create({
            username: 'John Seller',
            email: 'john@example.com',
            mobile: '9876543211',
            password: hashedPassword,
            role: 'Seller',
            profile: {
                name: 'John Doe',
                bio: 'Top seller',
                phone: '9876543211',
                location: 'NYC'
            }
        });

        // Buyer
        const buyer = await Buyer.create({
            username: 'Jane Buyer',
            email: 'jane@example.com',
            mobile: '9876543212',
            password: hashedPassword,
            role: 'Buyer',
            profile: {
                name: 'Jane Doe',
                phone: '9876543212',
                location: 'LA'
            }
        });

        console.log(`✅ Created Admin, Seller, and Buyer`);

        // Create products
        // Note: Product model needs to be checked for "seller" reference. 
        // If Product refers to "User", it might fail validation if we pass a Seller ID from "sellers" collection
        // IF the Product schema has `ref: 'User'`.
        // We need to check ProductModel.

        // I will assume for now I can seed products.
        // But I should comment out product seeding or fix ProductModel first.

        // Let's check ProductModel location and content before writing this file fully.
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}


seedDatabase();
