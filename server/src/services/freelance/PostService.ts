import Post, { IPost } from '../../models/freelance/PostModel';
import { CreatePostDto } from '../../dtos/freelance/PostDto';
import axios from 'axios';

class PostService {
    async getAllPosts() {
        return await Post.find().populate('user', 'username email profile.name').sort({ createdAt: -1 });
    }

    async createPost(postData: any) { // Changed to any or Partial<IPost> for flexibility
        const newPost = new Post(postData);
        return await newPost.save();
    }

    async updatePost(id: string, postData: any) {
        return await Post.findByIdAndUpdate(id, postData, { new: true });
    }

    async deletePost(id: string) {
        return await Post.findByIdAndDelete(id);
    }

    async getPostById(id: string) {
        return await Post.findById(id).populate('user', 'username email');
    }

    async generateImage(prompt: string) {
        try {
            const response = await axios.post(
                'https://api.freepik.com/v1/ai/text-to-image',
                {
                    prompt,
                    aspect_ratio: 'square',
                    num_images: 1,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-freepik-api-key': process.env.FREEPIK_API_KEY,
                        Accept: 'application/json',
                    },
                }
            );

            const data = response.data;
            let imageUrl: string | null = null;

            if (data.data && data.data.length > 0) {
                if (data.data[0].base64) {
                    imageUrl = `data:image/png;base64,${data.data[0].base64}`;
                } else if (data.data[0].url) {
                    imageUrl = data.data[0].url;
                }
            } else if (data.url) {
                imageUrl = data.url;
            }

            if (!imageUrl) {
                throw new Error('No image generated');
            }

            return imageUrl;
        } catch (error: any) {
            console.error('Freepik API Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to generate image');
        }
    }
}

export default new PostService();
