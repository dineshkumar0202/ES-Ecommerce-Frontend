import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Test route to verify router is working
router.get('/public/test', (req: Request, res: Response) => {
    res.json({ message: 'Public upload route is accessible' });
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Public upload route for registration flows (no auth required)
router.post('/public', upload.single('image'), async (req: Request, res: Response) => {
    console.log('Public upload route hit');
    try {
        if (!req.file) {
            console.log('No file in public upload request');
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log('Public upload file received:', req.file.originalname, 'Size:', req.file.size);

        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
            console.error('Cloudinary config missing in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const currentTimestamp = Math.round(new Date().getTime() / 1000);
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'es-ecommerce/registration',
                resource_type: 'auto',
                timestamp: currentTimestamp,
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({
                        message: 'Upload to cloud service failed',
                        cloudinaryError: error
                    });
                }
                res.status(200).json({
                    url: result?.secure_url,
                    public_id: result?.public_id
                });
            }
        );
        uploadStream.end(req.file.buffer);
    } catch (error: any) {
        console.error('Public upload error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Protected upload route (requires authentication)
router.post('/', protect, upload.single('image'), async (req: Request, res: Response) => {
    // console.log('Upload Request Received');
    try {
        if (!req.file) {
            console.log('No file in request');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // console.log('File detected:', req.file.originalname, 'Size:', req.file.size);

        // Check Cloudinary Config (Don't log secrets fully)
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
            console.error('Cloudinary config missing in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // Upload to Cloudinary using stream for performance (no local temp file)
        // Use current timestamp for Cloudinary signature validation
        const currentTimestamp = Math.round(new Date().getTime() / 1000);

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'es-ecommerce/products',
                resource_type: 'auto',
                timestamp: currentTimestamp,
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    // Cloudinary error object often contains 'message', 'http_code'
                    return res.status(500).json({
                        message: 'Upload to cloud service failed',
                        cloudinaryError: error // Send back actual error for frontend debugging
                    });
                }
                // console.log('Cloudinary upload success:', result?.secure_url);
                res.status(200).json({
                    url: result?.secure_url,
                    public_id: result?.public_id
                });
            }
        );

        uploadStream.end(req.file.buffer);
    } catch (error: any) {
        console.error('General upload error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
