import { Request, Response } from 'express';
import axios from 'axios';

class TryOnController {
    /**
     * POST /api/posts/try-on
     * Starts a virtual try-on job using the API4AI Virtual Try-On API.
     * Expects: { model_image: string (URL), garment_image: string (URL) }
     * Returns: { id: string, status: string, output: string[] }
     */
    async startTryOn(req: Request, res: Response) {
        const { model_image, garment_image } = req.body;

        if (!model_image || !garment_image) {
            res.status(400).json({ message: 'Both model_image and garment_image URLs are required.' });
            return;
        }

        try {
            // API4.AI Demo Endpoint (Free, No Key)
            // URL: https://demo.api4ai.cloud/virtual-try-on/v1/results
            // Method: POST
            // Content-Type: multipart/form-data

            const formData = new FormData();
            formData.append('url', model_image);
            formData.append('url-apparel', garment_image);

            console.log('[TryOn] Starting API4AI Demo request...');

            const response = await axios.post(
                'https://demo.api4ai.cloud/virtual-try-on/v1/results',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // Axios handles boundary automatically when FormData is used
                    }
                }
            );

            const result = response.data;
            let outputUrl: string | null = null;

            // Console log to see the structure if needed
            // console.log('[TryOn] Demo Response:', JSON.stringify(result));

            // Parse API4AI Demo response structure
            if (result.results && result.results.length > 0) {
                const firstResult = result.results[0];
                const entity = firstResult.entities && firstResult.entities[0];

                if (entity) {
                    if (entity.image) {
                        // Base64 image
                        outputUrl = entity.image.startsWith('data:') ? entity.image : `data:image/jpeg;base64,${entity.image}`;
                    } else if (entity.url) {
                        outputUrl = entity.url;
                    }
                } else if (firstResult.url) {
                    outputUrl = firstResult.url;
                }
            }

            if (outputUrl) {
                res.status(200).json({
                    id: 'demo_result_' + Date.now(),
                    status: 'completed',
                    output: [outputUrl]
                });
            } else {
                console.error('[TryOn] Could not parse output from API4AI Demo:', JSON.stringify(result));
                res.status(500).json({ message: 'No output image found in demo response.' });
            }

        } catch (error: any) {
            console.error('[TryOn] Demo API Error:', error.message);
            res.status(500).json({
                message: 'Virtual try-on failed (Demo).',
                error: error.message
            });
        }
    }

    /**
     * GET /api/posts/try-on/status/:id
     * Legacy polling endpoint. Since API4AI is synchronous, this is mainly
     * to satisfy the frontend loop if it ever hits this.
     */
    async getTryOnStatus(req: Request, res: Response) {
        const id = req.params.id as string;

        if (!id) {
            res.status(400).json({ message: 'Job ID is required.' });
            return;
        }

        // If for some reason we have a real async job ID (unlikely with this implementation)
        // or just a completed marker
        res.status(200).json({
            id,
            status: 'completed',
            output: [], // Frontend usually expects output in 'status' response only if 'completed', 
            // but normally we return it in startTryOn for direct results.
            // If frontend polls, it means startTryOn returned 'processing' (which we don't do).
            // So this is a fallback.
            isMock: id.startsWith('mock_'),
        });
    }
}

export default new TryOnController();
