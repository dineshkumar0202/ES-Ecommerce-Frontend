import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Configure Multer for memory storage
// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/', protect, upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to Cloudinary using stream for performance (no local temp file)
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'es-ecommerce/products',
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Upload transparency failed', error });
                }
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
