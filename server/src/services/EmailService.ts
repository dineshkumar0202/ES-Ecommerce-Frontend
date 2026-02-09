import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

class EmailService {
    private transporter: nodemailer.Transporter | null;

    constructor() {
        // Only initialize transporter if email credentials are configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.EMAIL_PORT || '587'),
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
        } else {
            this.transporter = null;
            console.warn('⚠️  Email service not configured. Set EMAIL_USER and EMAIL_PASS in .env to enable email notifications.');
        }
    }

    async sendEmail(options: EmailOptions) {
        if (!this.transporter) {
            console.warn('⚠️  Email not sent: Email service is not configured.');
            return null;
        }

        try {
            const mailOptions = {
                from: `"${process.env.EMAIL_FROM_NAME || 'AtoZ Marketplace'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
                to: options.to,
                subject: options.subject,
                html: options.html,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('✅ Email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('❌ Email sending failed:', error);
            throw error;
        }
    }

    // Order Confirmation Email
    async sendOrderConfirmation(userEmail: string, orderDetails: any) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(90deg, #bef264 0%, #d9f99d 100%); padding: 30px; text-align: center; }
                    .header h1 { margin: 0; color: #000; }
                    .content { background: #f8fafc; padding: 30px; }
                    .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
                    .total { font-size: 1.2em; font-weight: bold; margin-top: 20px; }
                    .footer { text-align: center; padding: 20px; color: #64748b; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order Confirmed!</h1>
                    </div>
                    <div class="content">
                        <p>Hi ${orderDetails.userName},</p>
                        <p>Thank you for your order! We're getting it ready for shipment.</p>
                        
                        <div class="order-details">
                            <h2>Order #${orderDetails.orderId}</h2>
                            ${orderDetails.items.map((item: any) => `
                                <div class="item">
                                    <span>${item.title} x ${item.quantity}</span>
                                    <span>₹${item.price * item.quantity}</span>
                                </div>
                            `).join('')}
                            <div class="total">
                                Total: ₹${orderDetails.totalPrice}
                            </div>
                        </div>
                        
                        <p><strong>Shipping Address:</strong><br>
                        ${orderDetails.shippingAddress}</p>
                        
                        <p>You can track your order status in your profile.</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 AtoZ Marketplace. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return this.sendEmail({
            to: userEmail,
            subject: `Order Confirmation - #${orderDetails.orderId}`,
            html,
        });
    }

    // Order Status Update Email
    async sendOrderStatusUpdate(userEmail: string, orderId: string, status: string) {
        const statusMessages: any = {
            'Shipped': 'Your order has been shipped!',
            'Out for Delivery': 'Your order is out for delivery!',
            'Delivered': 'Your order has been delivered!',
        };

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #000; color: white; padding: 30px; text-align: center; }
                    .content { padding: 30px; background: #f8fafc; }
                    .status-badge { display: inline-block; padding: 10px 20px; background: #bef264; color: #000; border-radius: 20px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order Update</h1>
                    </div>
                    <div class="content">
                        <p><span class="status-badge">${status}</span></p>
                        <h2>${statusMessages[status] || 'Order status updated'}</h2>
                        <p>Order #${orderId}</p>
                        <p>Track your order in your profile for more details.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return this.sendEmail({
            to: userEmail,
            subject: `Order Update - ${status}`,
            html,
        });
    }

    // Low Stock Alert Email (for admins)
    async sendLowStockAlert(adminEmail: string, products: any[]) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #ef4444; color: white; padding: 30px; text-align: center; }
                    .product { padding: 15px; background: white; margin: 10px 0; border-left: 4px solid #ef4444; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>⚠️ Low Stock Alert</h1>
                    </div>
                    <div style="padding: 30px; background: #f8fafc;">
                        <p>The following products are running low on stock:</p>
                        ${products.map(p => `
                            <div class="product">
                                <strong>${p.title}</strong><br>
                                Current Stock: ${p.stock} units<br>
                                SKU: ${p.sku || 'N/A'}
                            </div>
                        `).join('')}
                        <p>Please restock these items soon.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return this.sendEmail({
            to: adminEmail,
            subject: '⚠️ Low Stock Alert - Action Required',
            html,
        });
    }

    // Welcome Email
    async sendWelcomeEmail(userEmail: string, userName: string) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #000 0%, #1e293b 100%); color: white; padding: 40px; text-align: center; }
                    .content { padding: 30px; background: #f8fafc; }
                    .cta-button { display: inline-block; padding: 15px 30px; background: #bef264; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to AtoZ Marketplace!</h1>
                    </div>
                    <div class="content">
                        <p>Hi ${userName},</p>
                        <p>Welcome to AtoZ - your one-stop destination for Retail, Wholesale, Q-Commerce, Resale, and Freelance services!</p>
                        <p>Start exploring our platform and discover amazing products and services.</p>
                        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}" class="cta-button">Start Shopping</a>
                        <p>If you have any questions, feel free to reach out to our support team.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return this.sendEmail({
            to: userEmail,
            subject: 'Welcome to AtoZ Marketplace!',
            html,
        });
    }

    // Test Email Configuration
    async testEmailConfiguration(testEmail: string = 'test@example.com') {
        if (!this.transporter) {
            return {
                success: false,
                message: 'Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in .env file.',
            };
        }

        try {
            // Verify connection
            await this.transporter.verify();

            // Send test email
            const testHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; }
                        .success { color: #10b981; font-size: 24px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1 class="success">✓ Email Configuration Successful!</h1>
                        <p>Your email service is properly configured and working.</p>
                        <p><strong>Configuration:</strong></p>
                        <ul>
                            <li>Host: ${process.env.EMAIL_HOST}</li>
                            <li>Port: ${process.env.EMAIL_PORT}</li>
                            <li>User: ${process.env.EMAIL_USER}</li>
                        </ul>
                        <p>This is a test email from AtoZ Marketplace.</p>
                    </div>
                </body>
                </html>
            `;

            await this.sendEmail({
                to: testEmail,
                subject: 'AtoZ Marketplace - Email Configuration Test',
                html: testHtml,
            });

            return {
                success: true,
                message: `Test email sent successfully to ${testEmail}`,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `Email configuration test failed: ${error.message}`,
                error: error,
            };
        }
    }
}

export default new EmailService();
