import express from "express";
import { RegisterUserDto, LoginUserDto } from "../../dtos/users/AuthDto";
import { Request, Response } from 'express';
import AuthService from "../../services/users/AuthService";

class AuthController {
    async sendOtp(req: Request, res: Response) {
        try {
            const { mobile, email } = req.body;
            const identifier = mobile || email;

            if (!identifier) {
                res.status(400).json({ message: "Mobile number or Email is required" });
                return;
            }

            const result = await AuthService.generateAndSendOtp(identifier);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        try {
            const { mobile, email, otp } = req.body;
            const identifier = mobile || email;

            if (!identifier || !otp) {
                res.status(400).json({ message: "Identifier (Mobile/Email) and OTP are required" });
                return;
            }

            const result = await AuthService.verifyOtp(identifier, otp);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async registerUser(req: Request, res: Response) {
        // ... (legacy)
        try {
            const userData: RegisterUserDto = req.body;
            // ... (validation logic from original)
            if (!userData.email || userData.email.trim() === '') delete userData.email;
            if (!userData.username || !userData.mobile || !userData.password) {
                res.status(400).json({ message: "Name, Mobile, and Password are required" });
                return;
            }

            // Route based on role if provided, else default
            const user = await AuthService.registerUser(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    /** Validate Indian mobile: exactly 10 digits, starting with 6, 7, 8 or 9 */
    private validateMobile10(mobile: string): { valid: boolean; message?: string } {
        if (!mobile || typeof mobile !== 'string') return { valid: false, message: "Mobile number is required" };
        const digits = mobile.replace(/\D/g, '');
        if (digits.length !== 10) return { valid: false, message: "Mobile number must be exactly 10 digits" };
        if (!/^[6-9]\d{9}$/.test(digits)) return { valid: false, message: "Mobile number must start with 6, 7, 8 or 9" };
        return { valid: true };
    }

    async registerBuyer(req: Request, res: Response) {
        try {
            const userData = req.body;
            if (!userData.email || userData.email.trim() === '') delete userData.email;
            if (!userData.username || !userData.mobile || !userData.password) {
                res.status(400).json({ message: "Name, Mobile, and Password are required" });
                return;
            }
            const mobileCheck = this.validateMobile10(userData.mobile);
            if (!mobileCheck.valid) {
                res.status(400).json({ message: mobileCheck.message });
                return;
            }
            const user = await AuthService.registerBuyer(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async registerSeller(req: Request, res: Response) {
        try {
            const userData = req.body;
            if (!userData.email || userData.email.trim() === '') delete userData.email;
            if (!userData.username || !userData.mobile || !userData.password) {
                res.status(400).json({ message: "Name, Mobile, and Password are required" });
                return;
            }
            const mobileCheck = this.validateMobile10(userData.mobile);
            if (!mobileCheck.valid) {
                res.status(400).json({ message: mobileCheck.message });
                return;
            }
            const user = await AuthService.registerSeller(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginBuyer(req: Request, res: Response) {
        try {
            const loginData = req.body;
            if ((!loginData.mobile && !loginData.email) || !loginData.password) {
                res.status(400).json({ message: "Mobile/Email and Password are required" });
                return;
            }
            const user = await AuthService.loginBuyer(loginData);
            res.json(user);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async loginSeller(req: Request, res: Response) {
        try {
            const loginData = req.body;
            const hasCredential = loginData.mobile || loginData.email || loginData.uniqueId;
            if (!hasCredential) {
                res.status(400).json({ message: "Unique ID, Email or Mobile is required for seller login" });
                return;
            }
            if (!loginData.password || !String(loginData.password).trim()) {
                res.status(400).json({ message: "Password is required" });
                return;
            }
            if (loginData.mobile) {
                const mobileCheck = this.validateMobile10(loginData.mobile);
                if (!mobileCheck.valid) {
                    res.status(400).json({ message: mobileCheck.message });
                    return;
                }
            }
            const user = await AuthService.loginSeller(loginData);
            res.json(user);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async loginAdmin(req: Request, res: Response) {
        try {
            const loginData = req.body;
            if (!loginData.email || !loginData.password) {
                res.status(400).json({ message: "Email and Password are required" });
                return;
            }
            const user = await AuthService.loginAdmin(loginData);
            res.json(user);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
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
