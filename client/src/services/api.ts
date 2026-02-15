import axios from 'axios';

// Use relative /api so Vite dev proxy is used (avoids CORS). Set VITE_API_URL for production if needed.
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add interceptor to include token from localStorage if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear local storage and redirect to login if token is invalid
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');

            // Optional: Redirect to login page or reload to reset state
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                // window.location.href = '/login'; 
                // Better to just let the UI handle the missing token state refresh
            }
        }
        return Promise.reject(error);
    }
);

export const QProductService = {
    getAll: () => api.get('/q-commerce'),
    getById: (id: string) => api.get(`/q-commerce/${id}`),
    create: (data: any) => api.post('/q-commerce', data),
    update: (id: string, data: any) => api.put(`/q-commerce/${id}`, data),
    delete: (id: string) => api.delete(`/q-commerce/${id}`)
};

export const ResaleService = {
    getAll: () => api.get('/resale'),
    getMyProducts: () => api.get('/resale/my-products'),
    getById: (id: string) => api.get(`/resale/${id}`),
    create: (data: any) => api.post('/resale', data),
    update: (id: string, data: any) => api.put(`/resale/${id}`, data),
    delete: (id: string) => api.delete(`/resale/${id}`)
};

export const WholesaleService = {
    getAll: () => api.get('/wholesale'),
    getMyProducts: () => api.get('/wholesale/my-products'),
    getById: (id: string) => api.get(`/wholesale/${id}`),
    create: (data: any) => api.post('/wholesale', data),
    update: (id: string, data: any) => api.put(`/wholesale/${id}`, data),
    delete: (id: string) => api.delete(`/wholesale/${id}`)
};

export const ProductService = { // Retail
    getAll: (params?: any) => api.get('/products', { params }),
    getCategories: () => api.get('/products/categories'),
    getBrands: () => api.get('/products/brands'),
    getTopRated: () => api.get('/products/top'),
    getById: (id: string) => api.get(`/products/${id}`),
    createReview: (id: string, data: any) => api.post(`/products/${id}/reviews`, data),
    create: (data: any) => api.post('/products', data),
    update: (id: string, data: any) => api.put(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`)
};

export const FreelanceService = {
    getAll: () => api.get('/posts'),
    getMyPosts: () => api.get('/posts/my-posts'),
    getMyInterests: () => api.get('/posts/my-interests'),
    getById: (id: string) => api.get(`/posts/${id}`),
    create: (data: any) => api.post('/posts', data),
    update: (id: string, data: any) => api.put(`/posts/${id}`, data),
    updateStatus: (id: string, status: string) => api.put(`/posts/${id}/status`, { status }),
    delete: (id: string) => api.delete(`/posts/${id}`),
    submitInterest: (postId: string, data?: any) => api.post(`/posts/${postId}/interest`, data),
    generateImage: (prompt: string) => api.post('/posts/generate-image', { prompt }),
    startTryOn: (model_image: string, garment_image: string) => api.post('/posts/try-on', { model_image, garment_image }),
    getTryOnStatus: (jobId: string) => api.get(`/posts/try-on/status/${jobId}`)
};

export const OrderService = {
    getMyOrders: () => api.get('/orders/myorders'),
    getSellerOrders: () => api.get('/orders/seller/orders'),
    getAll: () => api.get('/orders'),
    getOrderById: (id: string) => api.get(`/orders/${id}`),
    create: (data: any) => api.post('/orders', data),
    updatePaid: (id: string, data: any) => api.put(`/orders/${id}/pay`, data),
    updateDelivered: (id: string) => api.put(`/orders/${id}/deliver`),
    updateStatus: (id: string, status: string) => api.put(`/orders/${id}/status`, { status })
};

export const NotificationService = {
    getNotifications: () => api.get('/notifications'),
    markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
    markAllAsRead: () => api.put('/notifications/read-all')
};

export const UserService = {
    getAll: () => api.get('/users'),
    getById: (id: string) => api.get(`/users/${id}`),
    delete: (id: string) => api.delete(`/users/${id}`),
    registerFreelancer: (data: any) => api.post('/users/freelancer/register', data),
    updateUserProfile: (data: any) => api.put('/users/profile', data),
    updateSellerProfile: (id: string, data: any) => api.put(`/users/seller/${id}`, data)
};

export const AdminService = {
    getStats: () => api.get('/admin/stats'),
    getActivities: () => api.get('/admin/activities'),
    getPendingFreelancers: () => api.get('/admin/freelancers/pending'),
    getVerifiedFreelancers: () => api.get('/admin/freelancers/verified'),
    getAllFreelancers: () => api.get('/admin/freelancers/all'),
    updateFreelancerStatus: (id: string, status: string, rejectionReason?: string) => api.put(`/admin/freelancers/${id}/status`, { status, rejectionReason }),
    getInterests: () => api.get('/admin/freelance/interests'),
    updateInterestStatus: (id: string, status: string) => api.put(`/admin/freelance/interests/${id}/status`, { status })
};

export const CartService = {
    getCart: () => api.get('/cart'),
    addToCart: (data: any) => api.post('/cart', data),
    removeFromCart: (productId: string) => api.delete(`/cart/${productId}`),
    updateQuantity: (productId: string, quantity: number) => api.put(`/cart/${productId}`, { quantity })
};

export const WishlistService = {
    getWishlist: () => api.get('/wishlist'),
    addToWishlist: (data: any) => api.post('/wishlist', data),
    removeFromWishlist: (id: string) => api.delete(`/wishlist/${id}`)
};

export const UploadService = {
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('/upload', formData, {
            headers: {
                'Content-Type': undefined
            }
        });
    },
    uploadImagePublic: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('/upload/public', formData, {
            headers: {
                'Content-Type': undefined
            }
        });
    }
};

export const PaymentService = {
    getConfig: () => api.get('/payments/config'),
    createPaymentIntent: (amount: number) => api.post('/payments/create-payment-intent', { amount })
};

export const AuthService = {
    login: (data: any) => api.post('/auth/login', data),
    register: (data: any) => api.post('/auth/register', data),
    getMe: () => api.get('/auth/me'),

    // New specific methods
    loginBuyer: (data: any) => api.post('/auth/login/buyer', data),
    loginSeller: (data: any) => api.post('/auth/login/seller', data),
    loginAdmin: (data: any) => api.post('/auth/login/admin', data),
    registerBuyer: (data: any) => api.post('/auth/register/buyer', data),
    registerSeller: (data: any) => api.post('/auth/register/seller', data),

    // OTP
    sendOtp: (data: { mobile?: string, email?: string }) => api.post('/auth/send-otp', data),
    verifyOtp: (data: { mobile?: string, email?: string, otp: string }) => api.post('/auth/verify-otp', data)
};

export default api;
