
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log('Checking Cloudinary Configuration...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
const secret = process.env.CLOUDINARY_API_SECRET;
console.log('API Secret (length):', secret ? secret.length : 'MISSING');
console.log('API Secret (first 4):', secret ? secret.substring(0, 4) : 'MISSING');


// Ensure we trim
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const api_key = process.env.CLOUDINARY_API_KEY?.trim();
const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();

console.log('--- Configuration ---');
console.log(`Cloud Name: '${cloud_name}'`);
console.log(`API Key:    '${api_key}'`);
if (api_secret) {
    console.log(`API Secret: '${api_secret.substring(0, 2)}...${api_secret.substring(api_secret.length - 2)}' (Length: ${api_secret.length})`);
} else {
    console.log('API Secret: MISSING');
}

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

// Test API call
console.log('--- Testing Connection (Ping) ---');
cloudinary.api.ping((error, result) => {
    if (error) {
        console.error('Ping Failed:', error);
    } else {
        console.log('Ping Success:', result);
    }
});
