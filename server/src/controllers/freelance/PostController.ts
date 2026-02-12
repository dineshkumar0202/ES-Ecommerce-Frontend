import { Request, Response } from 'express';
import PostService from '../../services/freelance/PostService';
import Interest from '../../models/freelance/InterestModel';
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

    async submitInterest(req: Request, res: Response) {
        try {
            const postId = req.params.id;
            const userId = (req as any).user?._id;

            // Check if already submitted
            const existing = await Interest.findOne({ post: postId, user: userId });
            if (existing) {
                res.status(400).json({ message: "You have already shown interest in this post" });
                return;
            }

            const { proposedPrice, estimatedDuration, details } = req.body;

            const newInterest = new Interest({
                post: postId,
                user: userId,
                proposedPrice: proposedPrice || 0,
                estimatedDuration: estimatedDuration || '',
                details: details || '',
                status: 'Pending'
            });

            await newInterest.save();
            res.status(201).json({ message: "Interest submitted successfully", interest: newInterest });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const userId = (req as any).user?._id;
            const postData = { ...req.body, user: userId };
            const newPost = await PostService.createPost(postData);
            res.status(201).json(newPost);
        } catch (error: any) {
            res.status(409).json({ message: error.message });
        }
    }

    async getPostById(req: Request, res: Response) {
        try {
            const post = await PostService.getPostById(req.params.id as string);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const post = await PostService.getPostById(req.params.id as string);
            if (!post) {
                res.status(404).json({ message: "Post not found" });
                return;
            }

            const user = (req as any).user;
            // Check ownership or admin
            const isOwner = post.user && (post.user as any)._id.toString() === user._id.toString();
            // Fallback for old posts without user: allow Admin or anyone? NO, Admin only.
            // If post.user is missing, only Admin can edit.

            if (!isOwner && user.role !== 'Admin') {
                res.status(401).json({ message: "Not authorized to update this post" });
                return;
            }

            const updatedPost = await PostService.updatePost(req.params.id as string, req.body);
            res.status(200).json(updatedPost);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updatePostStatus(req: Request, res: Response) {
        try {
            const { status } = req.body;
            const user = (req as any).user;

            if (user.role !== 'Admin') {
                res.status(401).json({ message: "Only Admin can update post status" });
                return;
            }

            const updatedPost = await PostService.updatePost(req.params.id as string, { status });
            res.status(200).json(updatedPost);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            const post = await PostService.getPostById(req.params.id as string);
            if (!post) {
                res.status(404).json({ message: "Post not found" });
                return;
            }

            const user = (req as any).user;
            const isOwner = post.user && (post.user as any)._id.toString() === user._id.toString();

            if (!isOwner && user.role !== 'Admin') {
                res.status(401).json({ message: "Not authorized to delete this post" });
                return;
            }

            await PostService.deletePost(req.params.id as string);
            res.status(200).json({ message: "Post removed" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
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
