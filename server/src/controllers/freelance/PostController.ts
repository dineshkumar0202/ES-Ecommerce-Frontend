import { Request, Response } from 'express';
import PostService from '../../services/freelance/PostService';
import { CreatePostDto } from '../../dtos/freelance/PostDto';

class PostController {
    async getPosts(req: Request, res: Response) {
        try {
            const posts = await PostService.getAllPosts();
            res.status(200).json(posts);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const postData: CreatePostDto = req.body;
            const newPost = await PostService.createPost(postData);
            res.status(201).json(newPost);
        } catch (error: any) {
            res.status(409).json({ message: error.message });
        }
    }

    async generateImage(req: Request, res: Response) {
        const { prompt } = req.body;

        if (!prompt) {
            res.status(400).json({ message: 'Prompt is required' });
            return;
        }

        try {
            const imageUrl = await PostService.generateImage(prompt);
            res.status(200).json({ imageUrl });
        } catch (error: any) {
            res.status(500).json({
                message: 'Failed to generate image',
                details: error.message,
            });
        }
    }
}

export default new PostController();
