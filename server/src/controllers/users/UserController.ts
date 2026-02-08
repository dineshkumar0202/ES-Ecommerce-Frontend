import { Request, Response } from 'express';
import UserService from '../../services/users/UserService';

interface IAuthRequest extends Request {
    user?: any;
}

class UserController {
    async getUserProfile(req: IAuthRequest, res: Response) {
        try {
            const user = await UserService.getUserProfile(req.user._id as string);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUserProfile(req: IAuthRequest, res: Response) {
        try {
            const user = await UserService.updateUserProfile(req.user._id as string, req.body);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getUserById(req.params.id as string);
            if (user) res.json(user);
            else res.status(404).json({ message: "User not found" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const success = await UserService.deleteUser(req.params.id as string);
            if (success) res.json({ message: "User removed" });
            else res.status(404).json({ message: "User not found" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await UserService.updateUser(req.params.id as string, req.body);
            if (user) res.json(user);
            else res.status(404).json({ message: "User not found" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();
