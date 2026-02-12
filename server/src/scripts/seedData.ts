import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Buyer from '../models/users/BuyerModel';
import Seller from '../models/users/SellerModel';
import Admin from '../models/users/AdminModel';
import Product from '../models/retail/ProductModel';

dotenv.config();

async function seedDatabase() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('📦 Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Buyer.deleteMany({});
        await Seller.deleteMany({});
        await Admin.deleteMany({});
        await Product.deleteMany({});

        // Create users
        console.log('👥 Creating users...');
        const password = 'password123';

        // Admin
        await Admin.create({
            username: 'Admin User',
            email: 'admin@atoz.com',
            password: password,
            role: 'Admin',
            profile: {
                name: 'Super Admin',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150'
            }
        });

        // Seller
        const seller = await Seller.create({
            username: 'TechGear Official',
            email: 'seller@techgear.in',
            mobile: '9876543210',
            password: password,
            uniqueId: 'SLR1001',
            role: 'Seller',
            profile: {
                name: 'TechGear Store',
                bio: 'Premium tech accessories provider.',
                location: 'Bangalore, India'
            }
        });

        // Buyer
        await Buyer.create({
            username: 'Dinesh Kumar',
            email: 'buyer@example.com',
            mobile: '9123456789',
            password: password,
            role: 'Buyer',
            profile: {
                name: 'Dinesh Kumar M',
                location: 'Chennai, India'
            }
        });

        console.log(`✅ Created Admin, Seller (ID: SLR1001), and Buyer`);

        // Create products
        console.log('🛍️  Seeding products...');
        const sampleProducts = [
            {
                title: "Premium Wireless Headphones",
                description: "Noise canceling wireless headphones with 40h battery life.",
                price: 12999,
                category: "Electronics",
                images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800"],
                stock: 50,
                brand: "Sony",
                seller: seller._id,
                rating: 4.8,
                numReviews: 120
            },
            {
                title: "Leather Urban Backpack",
                description: "Sustainable handcrafted leather backpack for daily commute.",
                price: 4500,
                category: "Fashion",
                images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800"],
                stock: 30,
                brand: "Wildcraft",
                seller: seller._id,
                rating: 4.5,
                numReviews: 85
            },
            {
                title: "Mechanical Gaming Keyboard",
                description: "RGB mechanical keyboard with blue switches.",
                price: 3200,
                category: "Electronics",
                images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800"],
                stock: 100,
                brand: "Logitech",
                seller: seller._id,
                rating: 4.7,
                numReviews: 210
            },
            {
                title: "Smart Ergonomic Chair",
                description: "Breathable mesh back with adjustable lumbar support.",
                price: 15400,
                category: "Lifestyle",
                images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800"],
                stock: 15,
                brand: "Herman Miller",
                seller: seller._id,
                rating: 4.9,
                numReviews: 45
            }
        ];

        await Product.insertMany(sampleProducts);
        console.log('✅ Products seeded successfully');

        console.log('✨ Database seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
