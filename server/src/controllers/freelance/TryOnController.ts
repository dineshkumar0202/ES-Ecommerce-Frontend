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

        // Use API4AI_API_KEY, fallback to FASHN_API_KEY if not migrated yet
        const apiKey = process.env.API4AI_API_KEY || process.env.FASHN_API_KEY || '';

        if (!apiKey || apiKey === 'YOUR_FASHN_API_KEY_HERE') {
            // Mock mode when API key is not configured
            console.log('[TryOn] API key not configured. Using mock mode.');
            res.status(200).json({
                id: 'mock_tryon_' + Date.now(),
                status: 'completed',
                output: [garment_image], // Return garment as mock result
                isMock: true,
            });
            return;
        }

        try {
            // API4.AI Virtual Try-On
            // Endpoint: https://api4ai.cloud/virtual-try-on/v1/results
            // Method: POST
            // Auth: X-API-KEY header
            // Payload: JSON with 'image' (person) and 'image2' (garment) OR 'url' and 'url-apparel'
            // Based on common patterns and search results, 'url' and 'url-apparel' are likely for URL-based requests.

            console.log('[TryOn] Starting API4AI request with key ending in...', apiKey.slice(-4));

            const response = await axios.post(
                'https://api4ai.cloud/virtual-try-on/v1/results',
                {
                    url: model_image,
                    "url-apparel": garment_image
                },
                {
                    headers: {
                        'X-API-KEY': apiKey,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            const result = response.data;
            let outputUrl: string | null = null;

            // Log response structure for debugging
            // console.log('[TryOn] API4AI Response:', JSON.stringify(result).substring(0, 500));

            // Parse API4AI response structure
            // Usually: { results: [ { status: { code: 'ok', ... }, entities: [ { image: 'base64...', url: '...' } ] } ] }
            if (result.results && result.results.length > 0) {
                const firstResult = result.results[0];
                const entity = firstResult.entities && firstResult.entities[0];

                if (entity) {
                    if (entity.url) {
                        outputUrl = entity.url;
                    } else if (entity.image) {
                        // If base64, ensure prefix
                        outputUrl = entity.image.startsWith('data:') ? entity.image : `data:image/jpeg;base64,${entity.image}`;
                    }
                } else if (firstResult.url) {
                    // Fallback property
                    outputUrl = firstResult.url;
                }
            }

            if (outputUrl) {
                // Return synchronous result
                res.status(200).json({
                    id: 'direct_result_' + Date.now(),
                    status: 'completed',
                    output: [outputUrl]
                });
            } else {
                console.error('[TryOn] Could not parse output from API4AI:', JSON.stringify(result));
                throw new Error('No output image found in API response.');
            }

        } catch (error: any) {
            console.error('[TryOn] API Error:', error.response?.data || error.message);

            // Map status codes
            const status = error.response?.status === 401 || error.response?.status === 403 ? 502 : (error.response?.status || 500);

            res.status(status).json({
                message: 'Virtual try-on failed.',
                details: error.response?.data || error.message,
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
