export interface CreateProductDto {
    title: string;
    description: string;
    price: number;
    category: string;
    subCategory?: string;
    images?: string[];
    thumbnail?: string;
    stock: number;
    seller: string; // User ID
    unit?: string;
    numReviews?: number;
    rating?: number;
}
