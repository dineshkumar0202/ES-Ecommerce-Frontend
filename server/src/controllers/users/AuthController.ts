import express from "express";
import { RegisterUserDto, LoginUserDto } from "../../dtos/users/AuthDto";
import { Request, Response } from 'express';
import AuthService from "../../services/users/AuthService";

class AuthController {
    async registerUser(req: Request, res: Response) {
        try {
            const userData: RegisterUserDto = req.body;

            // Remove empty email to avoid duplicate key error (sparse index needs missing field, not empty string)
            if (!userData.email || userData.email.trim() === '') {
                delete userData.email;
            }

            // Name (username), Mobile, Password are required
            if (!userData.username || !userData.mobile || !userData.password) {
                res.status(400).json({ message: "Name, Mobile, and Password are required" });
                return;
            }
            const user = await AuthService.registerUser(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const loginData: LoginUserDto = req.body;
            if ((!loginData.mobile && !loginData.email) || !loginData.password) {
                res.status(400).json({ message: "Mobile/Email and Password are required" });
                return;
            }
            const user = await AuthService.loginUser(loginData);
            res.json(user);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async getMe(req: any, res: Response) {
        try {
            const user = await AuthService.getUserProfile(req.user._id);
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new AuthController();
