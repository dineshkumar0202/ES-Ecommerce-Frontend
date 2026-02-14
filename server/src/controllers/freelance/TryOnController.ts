import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

console.log('[TryOn] Controller file loaded successfully');

class TryOnController {
    /**
     * POST /api/posts/try-on
     * Starts a virtual try-on job using the RapidAPI endpoint.
     */
    async startTryOn(req: Request, res: Response) {
        console.log('[TryOn] Received request at /api/posts/try-on');
        const { model_image, garment_image } = req.body;

        if (!model_image || !garment_image) {
            console.warn('[TryOn] Missing images in request');
            res.status(400).json({ message: 'Both model_image and garment_image URLs are required.' });
            return;
        }

        try {
            const apiKey = process.env.RAPIDAPI_KEY;

            if (!apiKey) {
                console.error('[TryOn] RAPIDAPI_KEY is missing in .env');
                res.status(500).json({ message: 'Server configuration error: RAPIDAPI_KEY missing.' });
                return;
            }

            console.log('[TryOn] Forwarding to virtual-try-on4.p.rapidapi.com...');

            // Using the user-suggested endpoint and payload structure
            const response = await axios.post(
                'https://virtual-try-on4.p.rapidapi.com/try-on',
                {
                    person_image: model_image,
                    outfit_image: garment_image
                },
                {
                    headers: {
                        'X-RapidAPI-Key': apiKey,
                        'X-RapidAPI-Host': 'virtual-try-on4.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const result = response.data;
            let outputUrl: string | null = null;

            console.log('[TryOn] RapidAPI Success. Response Status:', response.status);

            // Structure check for virtual-try-on4
            if (result.output_image_url) {
                outputUrl = result.output_image_url;
            } else if (result.image_url) {
                outputUrl = result.image_url;
            } else if (result.output) {
                outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
            } else if (result.image) {
                outputUrl = result.image.startsWith('data:') ? result.image : `data:image/jpeg;base64,${result.image}`;
            }

            if (outputUrl) {
                res.status(200).json({
                    id: 'tryon_' + Date.now(),
                    status: 'completed',
                    output: [outputUrl]
                });
            } else {
                console.warn('[TryOn] Could not identify output image URL in response');
                res.status(200).json({
                    id: 'tryon_' + Date.now(),
                    status: 'completed',
                    raw_result: result,
                    output: [result.output_image_url || result.image_url || ''],
                    message: 'Image path unexpected. Returning raw_result.'
                });
            }

        } catch (error: any) {
            const status = error.response?.status || 500;
            const errorData = error.response?.data;

            console.error('[TryOn] RapidAPI Error:', {
                status,
                message: error.message,
                data: errorData
            });

            res.status(status).json({
                message: 'Virtual try-on failed.',
                error: error.message,
                details: errorData
            });
        }
    }

    async getTryOnStatus(req: Request, res: Response) {
        const id = req.params.id as string;
        res.status(200).json({
            id,
            status: 'completed',
            isMock: id?.startsWith('mock_'),
        });
    }
}

export default new TryOnController();
