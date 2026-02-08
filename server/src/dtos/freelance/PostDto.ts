export interface CreatePostDto {
    title: string;
    description: string;
    price: number;
    currency: string;
    status: string;
    tagColor: string;
    tagTextColor: string;
    views: string;
    time: string;
    image: string;
    nameDisplay?: string;
    unit: string;
}

export interface GenerateImageDto {
    prompt: string;
}
