
import mongoose from 'mongoose';
import Product from '../models/retail/ProductModel';
import Seller from '../models/users/SellerModel';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const sampleProducts = [
    {
        title: "Modern Ergonomic Office Chair",
        description: "High-quality mesh back office chair with lumbar support and adjustable height. Perfect for long working hours.",
        price: 12999,
        category: "Furniture",
        subCategory: "Office Chairs",
        brand: "ErgoComfort",
        stock: 50,
        images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000"],
        thumbnail: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
        rating: 4.5,
        numReviews: 12
    },
    {
        title: "Wireless Noise Cancelling Headphones",
        description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
        price: 24999,
        category: "Electronics",
        subCategory: "Audio",
        brand: "SoundMaster",
        stock: 25,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000"],
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
        rating: 4.8,
        numReviews: 45
    },
    {
        title: "Smart Fitness Watch Series 5",
        description: "Track your fitness goals with heart rate monitoring, GPS, and sleep tracking. Water-resistant up to 50m.",
        price: 8999,
        category: "Electronics",
        subCategory: "Wearables",
        brand: "FitTech",
        stock: 100,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000"],
        thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
        rating: 4.2,
        numReviews: 8
    },
    {
        title: "Minimalist Wooden Coffee Table",
        description: "Solid oak wood coffee table with a modern minimalist design. Durable and stylish addition to any living room.",
        price: 15499,
        category: "Furniture",
        subCategory: "Tables",
        brand: "WoodWorks",
        stock: 15,
        images: ["https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1000"],
        thumbnail: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1000",
        rating: 4.7,
        numReviews: 22
    }
];

async function seedRetailProducts() {
    try {
        console.log('Connecting to MongoDB...', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');

        const sellerEmail = 'seller@atoz.com';
        const seller = await Seller.findOne({ email: sellerEmail });

        if (!seller) {
            console.error(`Seller with email ${sellerEmail} not found. Please run checkSellers.ts first.`);
            process.exit(1);
        }

        console.log(`Found seller: ${seller.username} (${seller._id})`);

        // Insert products
        const productsToInsert = sampleProducts.map(p => ({
            ...p,
            seller: seller._id,
            adminStatus: 'Approved',
            isActive: true
        }));

        const result = await Product.insertMany(productsToInsert);
        console.log(`Successfully added ${result.length} retail products for seller ${seller.username}.`);

        console.log('--- process complete ---');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedRetailProducts();
