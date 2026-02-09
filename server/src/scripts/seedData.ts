import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// Import models directly
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String },
    mobile: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ['Buyer', 'Seller', 'Admin'], default: 'Buyer' },
    profile: {
        name: String,
        avatar: String,
        bio: String,
        phone: String,
        location: String,
    },
    createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    brand: String,
    stock: { type: Number, default: 0 },
    images: [String],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    sku: String,
    lowStockThreshold: { type: Number, default: 10 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('📦 Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Product.deleteMany({});

        // Create users
        console.log('👥 Creating users...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = await User.insertMany([
            {
                username: 'Admin User',
                email: 'admin@atoz.com',
                mobile: '9876543210',
                password: hashedPassword,
                role: 'Admin',
            },
            {
                username: 'John Seller',
                email: 'john@example.com',
                mobile: '9876543211',
                password: hashedPassword,
                role: 'Seller',
            },
            {
                username: 'Jane Buyer',
                email: 'jane@example.com',
                mobile: '9876543212',
                password: hashedPassword,
                role: 'Buyer',
            },
        ]);
        console.log(`✅ Created ${users.length} users`);

        const seller = users.find(u => u.role === 'Seller');

        // Create products
        console.log('🛍️  Creating products...');
        const products = await Product.insertMany([
            {
                title: 'Premium Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation.',
                price: 4999,
                category: 'Electronics',
                brand: 'AudioTech',
                stock: 50,
                images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
                rating: 4.5,
                numReviews: 128,
                sku: 'AUDIO-WH-001',
                seller: seller?._id,
            },
            {
                title: 'Smart Fitness Watch',
                description: 'Track your fitness goals with this advanced smartwatch.',
                price: 8999,
                category: 'Electronics',
                brand: 'FitTech',
                stock: 35,
                images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
                rating: 4.7,
                numReviews: 256,
                sku: 'FIT-WATCH-002',
                seller: seller?._id,
            },
            {
                title: 'Organic Cotton T-Shirt',
                description: 'Comfortable and eco-friendly organic cotton t-shirt.',
                price: 799,
                category: 'Fashion',
                brand: 'EcoWear',
                stock: 100,
                images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
                rating: 4.3,
                numReviews: 89,
                sku: 'ECO-TSHIRT-003',
                seller: seller?._id,
            },
            {
                title: 'Stainless Steel Water Bottle',
                description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
                price: 1299,
                category: 'Home & Kitchen',
                brand: 'HydroLife',
                stock: 75,
                images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500'],
                rating: 4.6,
                numReviews: 167,
                sku: 'HYDRO-BTL-004',
                seller: seller?._id,
            },
            {
                title: 'Yoga Mat Premium',
                description: 'Non-slip yoga mat with extra cushioning.',
                price: 1999,
                category: 'Sports',
                brand: 'YogaPro',
                stock: 60,
                images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
                rating: 4.4,
                numReviews: 94,
                sku: 'YOGA-MAT-005',
                seller: seller?._id,
            },
            {
                title: 'Laptop Backpack',
                description: 'Durable laptop backpack with multiple compartments.',
                price: 2499,
                category: 'Accessories',
                brand: 'TravelGear',
                stock: 45,
                images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
                rating: 4.5,
                numReviews: 142,
                sku: 'TRAVEL-BP-006',
                seller: seller?._id,
            },
        ]);
        console.log(`✅ Created ${products.length} products`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   Users: ${users.length}`);
        console.log(`   Products: ${products.length}`);
        console.log('\n🔐 Test Credentials (all passwords: password123):');
        console.log('   Admin: admin@atoz.com');
        console.log('   Seller: john@example.com');
        console.log('   Buyer: jane@example.com');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
