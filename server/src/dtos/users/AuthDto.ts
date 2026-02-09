export interface RegisterUserDto {
    username: string; // Name
    mobile: string;
    password: string;
    role?: 'Buyer' | 'Seller' | 'Admin';
    email?: string;
}

export interface LoginUserDto {
    mobile?: string;
    email?: string;
    password: string;
}
