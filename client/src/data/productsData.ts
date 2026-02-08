export interface Review {
    id: number;
    userName: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
    images?: string[]; // Customer uploaded images
}

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    mrp: number;
    discount: number;
    rating: number;
    ratingCount: number;
    image: string;
    images: string[];
    description: string;
    features: string[];
    brand: string;
    inStock: boolean;
    reviews?: Review[];
}

export const allProducts: Product[] = [
    // Mobiles
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        category: "mobile",
        price: 134900,
        mrp: 159900,
        discount: 16,
        rating: 4.6,
        ratingCount: 8234,
        image: "https://images.unsplash.com/photo-1696446702183-cbd50c00f0e6?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1696446702183-cbd50c00f0e6?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1695653422715-991ec3a0db7a?w=800&h=800&fit=crop"
        ],
        description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system",
        features: [
            "A17 Pro chip with 6-core GPU",
            "Pro camera system with 48MP Main camera",
            "Titanium design with textured matte glass back",
            "6.7-inch Super Retina XDR display",
            "Up to 29 hours video playback"
        ],
        brand: "Apple",
        inStock: true,
        reviews: [
            {
                id: 1,
                userName: "Rajesh Kumar",
                rating: 5,
                date: "2024-01-15",
                comment: "Absolutely love this phone! The camera quality is outstanding and the titanium build feels premium. Battery life easily lasts a full day with heavy use.",
                helpful: 245,
                images: [
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop",
                    "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=150&h=150&fit=crop"
                ]
            },
            {
                id: 2,
                userName: "Priya Sharma",
                rating: 5,
                date: "2024-01-10",
                comment: "Best iPhone yet! The A17 Pro chip makes everything buttery smooth. Face ID works perfectly even in low light. Highly recommended!",
                helpful: 189
            },
            {
                id: 3,
                userName: "Amit Patel",
                rating: 4,
                date: "2024-01-05",
                comment: "Great phone overall, but quite expensive. The camera system is incredible for photography. Wish the charging was faster.",
                helpful: 156
            },
            {
                id: 4,
                userName: "Sneha Reddy",
                rating: 5,
                date: "2023-12-28",
                comment: "The display is gorgeous! Colors are vibrant and the 120Hz refresh rate makes scrolling so smooth. Worth every penny.",
                helpful: 203
            }
        ]
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra 512GB",
        category: "mobile",
        price: 119999,
        mrp: 139999,
        discount: 14,
        rating: 4.5,
        ratingCount: 6543,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop"
        ],
        description: "Galaxy AI is here. Epic, just like that.",
        features: [
            "200MP Camera with AI Zoom",
            "Snapdragon 8 Gen 3 processor",
            "6.8-inch Dynamic AMOLED 2X display",
            "5000mAh battery with 45W fast charging",
            "Built-in S Pen"
        ],
        brand: "Samsung",
        inStock: true
    },

    // Dresses
    {
        id: 3,
        name: "Women's Floral Summer Dress",
        category: "dress",
        price: 1299,
        mrp: 2999,
        discount: 57,
        rating: 4.3,
        ratingCount: 3421,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop"
        ],
        description: "Beautiful floral print summer dress perfect for any occasion",
        features: [
            "100% Cotton fabric",
            "Floral print design",
            "Comfortable fit",
            "Machine washable",
            "Available in multiple sizes"
        ],
        brand: "FashionHub",
        inStock: true
    },
    {
        id: 4,
        name: "Elegant Evening Gown",
        category: "dress",
        price: 3499,
        mrp: 6999,
        discount: 50,
        rating: 4.7,
        ratingCount: 1876,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=800&fit=crop"
        ],
        description: "Stunning evening gown for special occasions",
        features: [
            "Premium silk blend fabric",
            "Elegant design",
            "Perfect for parties and events",
            "Dry clean only",
            "Tailored fit"
        ],
        brand: "Elegance",
        inStock: true
    },

    // Watches
    {
        id: 5,
        name: "Apple Watch Series 9 GPS 45mm",
        category: "watch",
        price: 42900,
        mrp: 45900,
        discount: 7,
        rating: 4.8,
        ratingCount: 12453,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop"
        ],
        description: "The most advanced Apple Watch with powerful health features",
        features: [
            "S9 SiP with custom Apple silicon",
            "Always-On Retina display",
            "Advanced health sensors",
            "Up to 18 hours battery life",
            "Water resistant to 50 meters"
        ],
        brand: "Apple",
        inStock: true
    },
    {
        id: 6,
        name: "Fossil Gen 6 Smartwatch",
        category: "watch",
        price: 18995,
        mrp: 24995,
        discount: 24,
        rating: 4.4,
        ratingCount: 5632,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&fit=crop"
        ],
        description: "Premium smartwatch with Wear OS by Google",
        features: [
            "Snapdragon Wear 4100+ Platform",
            "1.28-inch AMOLED display",
            "Heart rate and SpO2 tracking",
            "Fast charging - 80% in 30 minutes",
            "Swim-proof design"
        ],
        brand: "Fossil",
        inStock: true
    },

    // Shoes
    {
        id: 7,
        name: "Nike Air Max 270",
        category: "shoes",
        price: 12995,
        mrp: 16995,
        discount: 24,
        rating: 4.6,
        ratingCount: 9876,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop"
        ],
        description: "Iconic Air Max 270 with maximum cushioning",
        features: [
            "Max Air unit for ultimate cushioning",
            "Breathable mesh upper",
            "Rubber outsole for traction",
            "Lightweight and comfortable",
            "Available in multiple colors"
        ],
        brand: "Nike",
        inStock: true
    },
    {
        id: 8,
        name: "Adidas Ultraboost 22",
        category: "shoes",
        price: 14999,
        mrp: 18999,
        discount: 21,
        rating: 4.7,
        ratingCount: 7654,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop"
        ],
        description: "Premium running shoes with Boost technology",
        features: [
            "Boost midsole for energy return",
            "Primeknit upper for comfort",
            "Continental rubber outsole",
            "Supportive heel counter",
            "Perfect for running and training"
        ],
        brand: "Adidas",
        inStock: true
    },

    // T-Shirts
    {
        id: 9,
        name: "Men's Premium Cotton T-Shirt",
        category: "tshirt",
        price: 499,
        mrp: 1299,
        discount: 62,
        rating: 4.2,
        ratingCount: 15234,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop"
        ],
        description: "Comfortable premium cotton t-shirt for everyday wear",
        features: [
            "100% Premium cotton",
            "Regular fit",
            "Soft and breathable",
            "Machine washable",
            "Available in multiple colors"
        ],
        brand: "BasicWear",
        inStock: true
    },
    {
        id: 10,
        name: "Women's Graphic Print T-Shirt",
        category: "tshirt",
        price: 599,
        mrp: 1499,
        discount: 60,
        rating: 4.3,
        ratingCount: 8765,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&h=800&fit=crop"
        ],
        description: "Trendy graphic print t-shirt with modern design",
        features: [
            "Soft cotton blend",
            "Unique graphic design",
            "Comfortable fit",
            "Fade-resistant print",
            "Perfect for casual wear"
        ],
        brand: "TrendyTees",
        inStock: true
    },
    {
        id: 11,
        name: "Men's Polo T-Shirt",
        category: "tshirt",
        price: 799,
        mrp: 1999,
        discount: 60,
        rating: 4.5,
        ratingCount: 12456,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop"
        ],
        description: "Classic polo t-shirt perfect for smart casual occasions",
        features: [
            "Premium pique cotton",
            "Ribbed collar and cuffs",
            "Two-button placket",
            "Breathable fabric",
            "Available in multiple colors"
        ],
        brand: "PoloClassic",
        inStock: true
    },
    {
        id: 12,
        name: "Unisex Oversized T-Shirt",
        category: "tshirt",
        price: 699,
        mrp: 1699,
        discount: 59,
        rating: 4.4,
        ratingCount: 9876,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&h=800&fit=crop"
        ],
        description: "Trendy oversized fit t-shirt for a relaxed streetwear look",
        features: [
            "Oversized relaxed fit",
            "100% cotton fabric",
            "Drop shoulder design",
            "Soft and comfortable",
            "Perfect for streetwear"
        ],
        brand: "StreetStyle",
        inStock: true
    },
    {
        id: 13,
        name: "Women's V-Neck T-Shirt",
        category: "tshirt",
        price: 549,
        mrp: 1399,
        discount: 61,
        rating: 4.2,
        ratingCount: 7654,
        image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop"
        ],
        description: "Elegant V-neck t-shirt with a flattering silhouette",
        features: [
            "Soft jersey fabric",
            "Flattering V-neckline",
            "Slim fit design",
            "Machine washable",
            "Versatile styling options"
        ],
        brand: "FemmeStyle",
        inStock: true
    },
    {
        id: 14,
        name: "Men's Sports Performance T-Shirt",
        category: "tshirt",
        price: 899,
        mrp: 2199,
        discount: 59,
        rating: 4.6,
        ratingCount: 11234,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&h=800&fit=crop"
        ],
        description: "High-performance athletic t-shirt with moisture-wicking technology",
        features: [
            "Moisture-wicking fabric",
            "Quick-dry technology",
            "Anti-odor treatment",
            "Breathable mesh panels",
            "Perfect for workouts"
        ],
        brand: "ActiveFit",
        inStock: true
    },

    // Headphones
    {
        id: 15,
        name: "Sony WH-1000XM5 Wireless Headphones",
        category: "headphones",
        price: 29990,
        mrp: 34990,
        discount: 14,
        rating: 4.8,
        ratingCount: 12453,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1572569028738-411a508d09e6?w=800&h=800&fit=crop"
        ],
        description: "Industry-leading noise cancelling headphones",
        features: [
            "Industry Leading Noise Cancellation",
            "30-hour battery life",
            "Crystal clear hands-free calling",
            "Ultra-comfortable design",
            "Quick charging support"
        ],
        brand: "Sony",
        inStock: true
    },
    {
        id: 16,
        name: "Bose QuietComfort 45",
        category: "headphones",
        price: 26990,
        mrp: 32900,
        discount: 18,
        rating: 4.7,
        ratingCount: 9876,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop"
        ],
        description: "Premium wireless headphones with legendary noise cancellation",
        features: [
            "Legendary noise cancellation",
            "24-hour battery life",
            "Aware Mode for hearing surroundings",
            "Premium materials and finish",
            "Comfortable for all-day wear"
        ],
        brand: "Bose",
        inStock: true
    },

    // Laptops
    {
        id: 17,
        name: "MacBook Pro 14-inch M3 Pro",
        category: "laptop",
        price: 199900,
        mrp: 229900,
        discount: 13,
        rating: 4.9,
        ratingCount: 5432,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop"
        ],
        description: "Supercharged by M3 Pro chip for extreme performance",
        features: [
            "M3 Pro chip with 11-core CPU",
            "14.2-inch Liquid Retina XDR display",
            "18GB unified memory",
            "512GB SSD storage",
            "Up to 18 hours battery life"
        ],
        brand: "Apple",
        inStock: true
    },
    {
        id: 18,
        name: "Dell XPS 15 9530",
        category: "laptop",
        price: 149990,
        mrp: 179990,
        discount: 17,
        rating: 4.6,
        ratingCount: 3421,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop"
        ],
        description: "Premium laptop with stunning InfinityEdge display",
        features: [
            "13th Gen Intel Core i7",
            "15.6-inch 4K OLED display",
            "16GB DDR5 RAM",
            "512GB NVMe SSD",
            "NVIDIA GeForce RTX 4050"
        ],
        brand: "Dell",
        inStock: true
    },

    // Tablets
    {
        id: 19,
        name: "iPad Air 11-inch M2",
        category: "tablet",
        price: 59900,
        mrp: 64900,
        discount: 8,
        rating: 4.7,
        ratingCount: 6789,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585790050230-5dd28404f8f3?w=800&h=800&fit=crop"
        ],
        description: "Powerful, colorful, and wonderfully versatile",
        features: [
            "M2 chip for incredible performance",
            "11-inch Liquid Retina display",
            "12MP Wide camera",
            "Touch ID for secure authentication",
            "All-day battery life"
        ],
        brand: "Apple",
        inStock: true
    },
    {
        id: 20,
        name: "Samsung Galaxy Tab S9",
        category: "tablet",
        price: 54999,
        mrp: 64999,
        discount: 15,
        rating: 4.5,
        ratingCount: 4321,
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585790050230-5dd28404f8f3?w=800&h=800&fit=crop"
        ],
        description: "Premium Android tablet with S Pen included",
        features: [
            "Snapdragon 8 Gen 2 processor",
            "11-inch Dynamic AMOLED 2X display",
            "8GB RAM, 128GB storage",
            "S Pen included",
            "IP68 water resistance"
        ],
        brand: "Samsung",
        inStock: true
    },

    // Smartwatches
    {
        id: 21,
        name: "Samsung Galaxy Watch 6",
        category: "smartwatch",
        price: 29999,
        mrp: 34999,
        discount: 14,
        rating: 4.6,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop"
        ],
        description: "Advanced health tracking and fitness companion",
        features: [
            "Advanced sleep coaching",
            "Body composition analysis",
            "Heart rate monitoring",
            "40mm Super AMOLED display",
            "Up to 40 hours battery life"
        ],
        brand: "Samsung",
        inStock: true
    },
    {
        id: 22,
        name: "Garmin Forerunner 265",
        category: "smartwatch",
        price: 44990,
        mrp: 49990,
        discount: 10,
        rating: 4.8,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"
        ],
        description: "GPS running smartwatch with AMOLED display",
        features: [
            "AMOLED touchscreen display",
            "Advanced running dynamics",
            "Training readiness score",
            "Up to 13 days battery life",
            "Built-in GPS and music"
        ],
        brand: "Garmin",
        inStock: true
    },

    // Wireless Earbuds
    {
        id: 23,
        name: "AirPods Pro (2nd generation)",
        category: "earbuds",
        price: 24900,
        mrp: 26900,
        discount: 7,
        rating: 4.8,
        ratingCount: 15678,
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop"
        ],
        description: "Adaptive Audio. Now playing.",
        features: [
            "Active Noise Cancellation",
            "Adaptive Audio",
            "Personalized Spatial Audio",
            "Up to 6 hours listening time",
            "MagSafe charging case"
        ],
        brand: "Apple",
        inStock: true
    },
    {
        id: 24,
        name: "Samsung Galaxy Buds2 Pro",
        category: "earbuds",
        price: 14999,
        mrp: 17999,
        discount: 17,
        rating: 4.5,
        ratingCount: 8765,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop"
        ],
        description: "Premium sound with intelligent ANC",
        features: [
            "Intelligent Active Noise Cancellation",
            "360 Audio with Direct Multi-Channel",
            "HD Voice calls",
            "Up to 8 hours playback",
            "IPX7 water resistance"
        ],
        brand: "Samsung",
        inStock: true
    },

    // Cameras
    {
        id: 25,
        name: "Canon EOS R6 Mark II",
        category: "camera",
        price: 249990,
        mrp: 279990,
        discount: 11,
        rating: 4.9,
        ratingCount: 2345,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606941369e88-8b0f1e3a6c28?w=800&h=800&fit=crop"
        ],
        description: "Professional mirrorless camera with incredible autofocus",
        features: [
            "24.2MP Full-Frame CMOS Sensor",
            "Dual Pixel CMOS AF II",
            "4K 60p video recording",
            "In-body image stabilization",
            "High-speed continuous shooting"
        ],
        brand: "Canon",
        inStock: true
    },
    {
        id: 26,
        name: "Sony Alpha A7 IV",
        category: "camera",
        price: 234990,
        mrp: 259990,
        discount: 10,
        rating: 4.8,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606941369e88-8b0f1e3a6c28?w=800&h=800&fit=crop"
        ],
        description: "Versatile full-frame camera for photo and video",
        features: [
            "33MP Full-Frame Exmor R Sensor",
            "Real-time Eye AF",
            "4K 60p video",
            "5-axis in-body stabilization",
            "CFexpress Type A / SD card slots"
        ],
        brand: "Sony",
        inStock: true
    },

    // Gaming Consoles
    {
        id: 27,
        name: "PlayStation 5 Digital Edition",
        category: "gaming",
        price: 44990,
        mrp: 49990,
        discount: 10,
        rating: 4.7,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=800&fit=crop"
        ],
        description: "Next-gen gaming console with ultra-high speed SSD",
        features: [
            "Ultra-high speed SSD",
            "Ray tracing support",
            "4K gaming at 120fps",
            "Tempest 3D AudioTech",
            "DualSense wireless controller"
        ],
        brand: "Sony",
        inStock: true
    },
    {
        id: 28,
        name: "Xbox Series X",
        category: "gaming",
        price: 49990,
        mrp: 54990,
        discount: 9,
        rating: 4.6,
        ratingCount: 9876,
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&h=800&fit=crop"
        ],
        description: "Most powerful Xbox ever with 12 teraflops of power",
        features: [
            "12 teraflops GPU power",
            "4K gaming at 120fps",
            "1TB custom SSD",
            "Quick Resume feature",
            "Xbox Game Pass compatible"
        ],
        brand: "Microsoft",
        inStock: true
    },

    // Fitness Trackers
    {
        id: 29,
        name: "Fitbit Charge 6",
        category: "fitness",
        price: 14999,
        mrp: 17999,
        discount: 17,
        rating: 4.4,
        ratingCount: 6789,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800&h=800&fit=crop"
        ],
        description: "Advanced fitness tracker with built-in GPS",
        features: [
            "Built-in GPS",
            "Heart rate monitoring",
            "Sleep tracking",
            "7-day battery life",
            "Water resistant to 50m"
        ],
        brand: "Fitbit",
        inStock: true
    },
    {
        id: 30,
        name: "Xiaomi Mi Band 8",
        category: "fitness",
        price: 3999,
        mrp: 4999,
        discount: 20,
        rating: 4.3,
        ratingCount: 15678,
        image: "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop"
        ],
        description: "Affordable fitness band with comprehensive health tracking",
        features: [
            "1.62-inch AMOLED display",
            "150+ sports modes",
            "24/7 heart rate monitoring",
            "16-day battery life",
            "5ATM water resistance"
        ],
        brand: "Xiaomi",
        inStock: true
    },

    // Smart Home
    {
        id: 31,
        name: "Amazon Echo Dot (5th Gen)",
        category: "smart-home",
        price: 4999,
        mrp: 5999,
        discount: 17,
        rating: 4.5,
        ratingCount: 23456,
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&h=800&fit=crop"
        ],
        description: "Smart speaker with Alexa and improved audio",
        features: [
            "Alexa voice assistant",
            "Improved audio quality",
            "Smart home hub",
            "Temperature sensor",
            "Tap to snooze alarms"
        ],
        brand: "Amazon",
        inStock: true
    },
    {
        id: 32,
        name: "Google Nest Hub (2nd Gen)",
        category: "smart-home",
        price: 8999,
        mrp: 10999,
        discount: 18,
        rating: 4.6,
        ratingCount: 8765,
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=800&fit=crop"
        ],
        description: "Smart display with Google Assistant",
        features: [
            "7-inch touchscreen",
            "Google Assistant built-in",
            "Sleep sensing technology",
            "Smart home control",
            "Video streaming support"
        ],
        brand: "Google",
        inStock: true
    },

    // Monitors
    {
        id: 33,
        name: "LG UltraGear 27\" 4K Gaming Monitor",
        category: "monitor",
        price: 44990,
        mrp: 54990,
        discount: 18,
        rating: 4.7,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&h=800&fit=crop"
        ],
        description: "4K gaming monitor with 144Hz refresh rate",
        features: [
            "27-inch 4K UHD display",
            "144Hz refresh rate",
            "1ms response time",
            "NVIDIA G-SYNC compatible",
            "HDR10 support"
        ],
        brand: "LG",
        inStock: true
    },
    {
        id: 34,
        name: "Dell UltraSharp 27\" 4K Monitor",
        category: "monitor",
        price: 39990,
        mrp: 49990,
        discount: 20,
        rating: 4.8,
        ratingCount: 4567,
        image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop"
        ],
        description: "Professional 4K monitor with accurate colors",
        features: [
            "27-inch 4K IPS display",
            "99% sRGB color coverage",
            "USB-C connectivity",
            "Height adjustable stand",
            "ComfortView Plus technology"
        ],
        brand: "Dell",
        inStock: true
    },

    // Keyboards
    {
        id: 35,
        name: "Logitech MX Keys",
        category: "keyboard",
        price: 11999,
        mrp: 14999,
        discount: 20,
        rating: 4.7,
        ratingCount: 7890,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop"
        ],
        description: "Advanced wireless keyboard for productivity",
        features: [
            "Backlit keys",
            "Multi-device connectivity",
            "USB-C rechargeable",
            "Perfect Stroke keys",
            "Smart illumination"
        ],
        brand: "Logitech",
        inStock: true
    },
    {
        id: 36,
        name: "Keychron K8 Mechanical Keyboard",
        category: "keyboard",
        price: 7999,
        mrp: 9999,
        discount: 20,
        rating: 4.6,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop"
        ],
        description: "Wireless mechanical keyboard for Mac and Windows",
        features: [
            "Gateron mechanical switches",
            "RGB backlight",
            "Wireless and wired modes",
            "Mac and Windows compatible",
            "Hot-swappable switches"
        ],
        brand: "Keychron",
        inStock: true
    },

    // Mice
    {
        id: 37,
        name: "Logitech MX Master 3S",
        category: "mouse",
        price: 8999,
        mrp: 10999,
        discount: 18,
        rating: 4.8,
        ratingCount: 9876,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop"
        ],
        description: "Premium wireless mouse for productivity",
        features: [
            "8K DPI sensor",
            "MagSpeed scroll wheel",
            "Multi-device connectivity",
            "USB-C rechargeable",
            "Ergonomic design"
        ],
        brand: "Logitech",
        inStock: true
    },
    {
        id: 38,
        name: "Razer DeathAdder V3 Pro",
        category: "mouse",
        price: 12999,
        mrp: 15999,
        discount: 19,
        rating: 4.7,
        ratingCount: 6543,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop"
        ],
        description: "Wireless gaming mouse with Focus Pro 30K sensor",
        features: [
            "Focus Pro 30K optical sensor",
            "Wireless HyperSpeed technology",
            "90-hour battery life",
            "Ergonomic design",
            "Razer Chroma RGB"
        ],
        brand: "Razer",
        inStock: true
    },

    // Backpacks
    {
        id: 39,
        name: "The North Face Borealis Backpack",
        category: "backpack",
        price: 7999,
        mrp: 9999,
        discount: 20,
        rating: 4.6,
        ratingCount: 4567,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop"
        ],
        description: "Versatile backpack for everyday use",
        features: [
            "28-liter capacity",
            "Laptop sleeve (15-inch)",
            "FlexVent suspension system",
            "Multiple compartments",
            "Water bottle pockets"
        ],
        brand: "The North Face",
        inStock: true
    },
    {
        id: 40,
        name: "SwissGear 1900 Travel Backpack",
        category: "backpack",
        price: 5999,
        mrp: 7999,
        discount: 25,
        rating: 4.5,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"
        ],
        description: "Durable travel backpack with TSA-friendly design",
        features: [
            "TSA-friendly laptop compartment",
            "Multiple organizational pockets",
            "Padded back panel",
            "Airflow back system",
            "Weather-resistant fabric"
        ],
        brand: "SwissGear",
        inStock: true
    },

    // --- NEW FASHION PRODUCTS (IDs 41-60) ---

    // Men's Fashion
    {
        id: 41,
        name: "Levi's Men's 501 Original Fit Jeans",
        category: "fashion",
        price: 3499,
        mrp: 4999,
        discount: 30,
        rating: 4.5,
        ratingCount: 12453,
        image: "https://images.unsplash.com/photo-1542272617-08f082287809?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1542272617-08f082287809?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&h=800&fit=crop"
        ],
        description: "Classic straight leg jeans",
        features: ["100% Cotton", "Button fly", "Original fit", "5-pocket styling"],
        brand: "Levi's",
        inStock: true
    },
    {
        id: 42,
        name: "Tommy Hilfiger Men's Bomber Jacket",
        category: "fashion",
        price: 6999,
        mrp: 9999,
        discount: 30,
        rating: 4.7,
        ratingCount: 3421,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&h=800&fit=crop"
        ],
        description: "Classic water-resistant bomber jacket",
        features: ["Water resistant", "Ribbed cuffs", "Interior pocket", "Zip closure"],
        brand: "Tommy Hilfiger",
        inStock: true
    },
    {
        id: 43,
        name: "Puma Men's Essentials Hoodie",
        category: "fashion",
        price: 1999,
        mrp: 3499,
        discount: 43,
        rating: 4.4,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800&h=800&fit=crop"
        ],
        description: "Comfortable fleece hoodie",
        features: ["Cotton blend", "Kangaroo pocket", "Drawstring hood", "Regular fit"],
        brand: "Puma",
        inStock: true
    },
    {
        id: 44,
        name: "Calvin Klein Men's Slim Fit Suit",
        category: "fashion",
        price: 14999,
        mrp: 24999,
        discount: 40,
        rating: 4.8,
        ratingCount: 1234,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1593030761757-71bd90dbe3e4?w=800&h=800&fit=crop"
        ],
        description: "Modern distinct slim fit suit",
        features: ["Wool blend", "Slim fit", "Notched lapel", "Side vents"],
        brand: "Calvin Klein",
        inStock: true
    },
    {
        id: 45,
        name: "Lacoste Men's Polo Shirt",
        category: "fashion",
        price: 4999,
        mrp: 6999,
        discount: 28,
        rating: 4.6,
        ratingCount: 2345,
        image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&h=800&fit=crop"
        ],
        description: "Symbol of relaxed elegance",
        features: ["100% Cotton", "Classic fit", "Ribbed collar", "Embroidered crocodile"],
        brand: "Lacoste",
        inStock: true
    },

    // Women's Fashion
    {
        id: 46,
        name: "Zara Floral Midi Dress",
        category: "fashion",
        price: 2999,
        mrp: 4999,
        discount: 40,
        rating: 4.7,
        ratingCount: 4567,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=800&fit=crop"
        ],
        description: "Elegant floral print dress",
        features: ["Viscose fabric", "V-neck", "Short sleeves", "Button-up front"],
        brand: "Zara",
        inStock: true
    },
    {
        id: 47,
        name: "H&M High Waisted Jeans",
        category: "fashion",
        price: 1999,
        mrp: 2999,
        discount: 33,
        rating: 4.5,
        ratingCount: 6789,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1584370848010-d7ccb2bed39c?w=800&h=800&fit=crop"
        ],
        description: "Vintage slim high ankle jeans",
        features: ["Stretch denim", "High waist", "Slim fit", "Cropped length"],
        brand: "H&M",
        inStock: true
    },
    {
        id: 48,
        name: "Mango Trench Coat",
        category: "fashion",
        price: 8999,
        mrp: 12999,
        discount: 30,
        rating: 4.8,
        ratingCount: 1234,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544923246-777128602bda?w=800&h=800&fit=crop"
        ],
        description: "Classic double-breasted trench",
        features: ["Water repellent", "Belted waist", "Lapel collar", "Side pockets"],
        brand: "Mango",
        inStock: true
    },
    {
        id: 49,
        name: "Uniqlo Cashmere Sweater",
        category: "fashion",
        price: 5999,
        mrp: 7999,
        discount: 25,
        rating: 4.9,
        ratingCount: 2345,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800&h=800&fit=crop"
        ],
        description: "Premium 100% cashmere",
        features: ["100% Cashmere", "Crew neck", "Soft touch", "Ribbed trim"],
        brand: "Uniqlo",
        inStock: true
    },
    {
        id: 50,
        name: "Forever 21 Summer Skirt",
        category: "fashion",
        price: 1299,
        mrp: 1999,
        discount: 35,
        rating: 4.3,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800&h=800&fit=crop"
        ],
        description: "Lightweight floral pleated skirt",
        features: ["Polyester chiffon", "Elastic waist", "Midi length", "Lined"],
        brand: "Forever 21",
        inStock: true
    },

    // Footwear
    {
        id: 51,
        name: "Converse Chuck 70 High Top",
        category: "fashion",
        price: 4999,
        mrp: 5999,
        discount: 17,
        rating: 4.8,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1607522370255-f8005b97dc25?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1607522370255-f8005b97dc25?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop"
        ],
        description: "Iconic canvas high top sneakers",
        features: ["Canvas upper", "Rubber toe cap", "Ortholite cushioning", "Vintage stitching"],
        brand: "Converse",
        inStock: true
    },
    {
        id: 52,
        name: "Dr. Martens 1460 Boots",
        category: "fashion",
        price: 13999,
        mrp: 16999,
        discount: 18,
        rating: 4.8,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?w=800&h=800&fit=crop"
        ],
        description: "Original 8-eye boot",
        features: ["Smooth leather", "AirWair sole", "Yellow stitching", "Slip resistant"],
        brand: "Dr. Martens",
        inStock: true
    },
    {
        id: 53,
        name: "Vans Old Skool",
        category: "fashion",
        price: 3999,
        mrp: 4999,
        discount: 20,
        rating: 4.7,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop"
        ],
        description: "Classic skate shoe",
        features: ["Suede/Canvas upper", "Waffle outsole", "Low top", "Padded collar"],
        brand: "Vans",
        inStock: true
    },
    {
        id: 54,
        name: "Timberland Premium 6-Inch Boot",
        category: "fashion",
        price: 15999,
        mrp: 18999,
        discount: 16,
        rating: 4.8,
        ratingCount: 4567,
        image: "https://images.unsplash.com/photo-1520639888713-7871133bad1b?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1520639888713-7871133bad1b?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?w=800&h=800&fit=crop"
        ],
        description: "Original waterproof boot",
        features: ["Waterproof leather", "PrimaLoft insulation", "Rubber lug outsole", "Anti-fatigue technology"],
        brand: "Timberland",
        inStock: true
    },
    {
        id: 55,
        name: "Birkenstock Arizona Sandals",
        category: "fashion",
        price: 8999,
        mrp: 9999,
        discount: 10,
        rating: 4.7,
        ratingCount: 6789,
        image: "https://images.unsplash.com/photo-1603487742131-4160d6e18489?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1603487742131-4160d6e18489?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1621251203029-79d233e6fa16?w=800&h=800&fit=crop"
        ],
        description: "Classic two-strap sandal",
        features: ["Birko-Flor upper", "Cork footbed", "EVA sole", "Adjustable straps"],
        brand: "Birkenstock",
        inStock: true
    },

    // Accessories
    {
        id: 56,
        name: "Ray-Ban Aviator Sunglasses",
        category: "fashion",
        price: 8990,
        mrp: 10490,
        discount: 14,
        rating: 4.8,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop"
        ],
        description: "Classic aviator style",
        features: ["Metal frame", "UV protection", "Glass lenses", "Made in Italy"],
        brand: "Ray-Ban",
        inStock: true
    },
    {
        id: 57,
        name: "Fossil Leather Messenger Bag",
        category: "fashion",
        price: 9999,
        mrp: 14999,
        discount: 33,
        rating: 4.6,
        ratingCount: 1234,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop"
        ],
        description: "Durable leather work bag",
        features: ["Genuine leather", "Laptop compartment", "Adjustable strap", "Multiple pockets"],
        brand: "Fossil",
        inStock: true
    },
    {
        id: 58,
        name: "Daniel Wellington Sheffield Watch",
        category: "fashion",
        price: 11999,
        mrp: 13999,
        discount: 14,
        rating: 4.7,
        ratingCount: 2345,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop"
        ],
        description: "Minimalist classic watch",
        features: ["Japanese quartz movement", "Leather strap", "Water resistant 3ATM", "Ultrathin case"],
        brand: "Daniel Wellington",
        inStock: true
    },
    {
        id: 59,
        name: "Calvin Klein Leather Belt",
        category: "fashion",
        price: 2499,
        mrp: 3999,
        discount: 38,
        rating: 4.5,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1624222244080-6924ed0f0a94?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1624222244080-6924ed0f0a94?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"
        ],
        description: "Reversible leather belt",
        features: ["Genuine leather", "Reversible buckle", "Formal style", "Width 3.5cm"],
        brand: "Calvin Klein",
        inStock: true
    },
    {
        id: 60,
        name: "Herschel Novel Duffle Bag",
        category: "fashion",
        price: 6999,
        mrp: 8999,
        discount: 22,
        rating: 4.8,
        ratingCount: 4567,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop"
        ],
        description: "Perfect weekend getaway bag",
        features: ["Signature shoe compartment", "Waterproof zipper", "Removable shoulder strap", "42.5L capacity"],
        brand: "Herschel",
        inStock: true
    },

    // --- NEW KEEP SHOPPING PRODUCTS (IDs 61-80) ---

    // Home Decor & Furniture
    {
        id: 61,
        name: "Philips Hue Smart Bulb Starter Kit",
        category: "home-decor",
        price: 9999,
        mrp: 12999,
        discount: 23,
        rating: 4.6,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&h=800&fit=crop"
        ],
        description: "Smart lighting starter kit",
        features: ["16 million colors", "Voice control", "App controlled", "Energy efficient"],
        brand: "Philips",
        inStock: true
    },
    {
        id: 62,
        name: "Wakefit Orthopedic Memory Foam Mattress",
        category: "home-decor",
        price: 12999,
        mrp: 19999,
        discount: 35,
        rating: 4.7,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1631049307208-950c33091af6?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1631049307208-950c33091af6?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1505693456377-2791151fc057?w=800&h=800&fit=crop"
        ],
        description: "Comfortable orthopedic mattress",
        features: ["Memory foam", "Spinal alignment", "Breathable fabric", "10-year warranty"],
        brand: "Wakefit",
        inStock: true
    },
    {
        id: 63,
        name: "IKEA POÄNG Armchair",
        category: "home-decor",
        price: 6990,
        mrp: 8990,
        discount: 22,
        rating: 4.8,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1567538563336-9b578c773950?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1567538563336-9b578c773950?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1598300042247-d088f11ab635?w=800&h=800&fit=crop"
        ],
        description: "Iconic Scandinavian armchair",
        features: ["Layered bent wood", "Removable cover", "Ergonomic design", "10-year guarantee"],
        brand: "IKEA",
        inStock: true
    },
    {
        id: 64,
        name: "Dyson V15 Detect Vacuum",
        category: "home-decor",
        price: 65900,
        mrp: 69900,
        discount: 6,
        rating: 4.8,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1558317374-a3545eca46f2?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1558317374-a3545eca46f2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=800&h=800&fit=crop"
        ],
        description: "Powerful intelligent cordless vacuum",
        features: ["Laser dust detection", "Piezo sensor", "60 mins run time", "LCD screen"],
        brand: "Dyson",
        inStock: true
    },
    {
        id: 65,
        name: "Milton Thermosteel Water Bottle",
        category: "home-decor",
        price: 999,
        mrp: 1299,
        discount: 23,
        rating: 4.5,
        ratingCount: 23456,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1536939459926-30130d58f81e?w=800&h=800&fit=crop"
        ],
        description: "Vacuum insulated steel bottle",
        features: ["24h hot/cold retention", "1000ml capacity", "Rust proof", "Leak proof"],
        brand: "Milton",
        inStock: true
    },

    // Books
    {
        id: 66,
        name: "Atomic Habits by James Clear",
        category: "books",
        price: 499,
        mrp: 799,
        discount: 37,
        rating: 4.9,
        ratingCount: 45678,
        image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop"
        ],
        description: "Tiny Changes, Remarkable Results",
        features: ["Hardcover", "Self-help", "Bestseller", "320 pages"],
        brand: "Penguin",
        inStock: true
    },
    {
        id: 67,
        name: "Thinking, Fast and Slow",
        category: "books",
        price: 399,
        mrp: 599,
        discount: 33,
        rating: 4.7,
        ratingCount: 23456,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=800&fit=crop"
        ],
        description: "Groundbreaking tour of the mind",
        features: ["Paperback", "Psychology", "NOBEL PRIZE winner", "512 pages"],
        brand: "Penguin",
        inStock: true
    },
    {
        id: 68,
        name: "Kindle Paperwhite (16GB)",
        category: "books",
        price: 13999,
        mrp: 14999,
        discount: 7,
        rating: 4.8,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=800&fit=crop"
        ],
        description: "Now with 6.8\" display and warm light",
        features: ["300 ppi glare-free", "IPX8 waterproof", "10 weeks battery", "Adjustable warm light"],
        brand: "Amazon",
        inStock: true
    },
    {
        id: 69,
        name: "Harry Potter Box Set",
        category: "books",
        price: 2999,
        mrp: 4999,
        discount: 40,
        rating: 5.0,
        ratingCount: 56789,
        image: "https://images.unsplash.com/photo-1610415615697-3f268b80fc2d?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1610415615697-3f268b80fc2d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1626618012641-bfbca5a3123c?w=800&h=800&fit=crop"
        ],
        description: "Complete collection of J.K. Rowling's series",
        features: ["7 Books", "Special Edition Box", "Fantasy", "Classic"],
        brand: "Bloomsbury",
        inStock: true
    },
    {
        id: 70,
        name: "Moleskine Classic Notebook",
        category: "books",
        price: 1999,
        mrp: 2499,
        discount: 20,
        rating: 4.6,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=800&fit=crop"
        ],
        description: "Hard Cover Large Ruled Notebook",
        features: ["240 pages", "Acid-free paper", "Expandable pocket", "Elastic closure"],
        brand: "Moleskine",
        inStock: true
    },

    // Toys & Gaming
    {
        id: 71,
        name: "LEGO Star Wars Millennium Falcon",
        category: "toys",
        price: 14999,
        mrp: 16999,
        discount: 12,
        rating: 4.9,
        ratingCount: 2345,
        image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=800&fit=crop"
        ],
        description: "Buildable Starship Model",
        features: ["1351 pieces", "7 minifigures", "Interior details", "Display stand"],
        brand: "LEGO",
        inStock: true
    },
    {
        id: 72,
        name: "DJI Mini 4 Pro Drone",
        category: "toys",
        price: 84990,
        mrp: 99990,
        discount: 15,
        rating: 4.8,
        ratingCount: 1234,
        image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&h=800&fit=crop"
        ],
        description: "Mini Camera Drone with 4K Video",
        features: ["Under 249g", "4K/60fps HDR", "Obstacle sensing", "34-min flight"],
        brand: "DJI",
        inStock: true
    },
    {
        id: 73,
        name: "Uno Flip Card Game",
        category: "toys",
        price: 249,
        mrp: 399,
        discount: 37,
        rating: 4.7,
        ratingCount: 45678,
        image: "https://images.unsplash.com/photo-1605367035677-789a7fb3c1bd?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1605367035677-789a7fb3c1bd?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1611195973863-e60aca15400eb?w=800&h=800&fit=crop"
        ],
        description: "Classic Card Game with a Twist",
        features: ["Double-sided deck", "2-10 players", "Family fun", "Travel friendly"],
        brand: "Mattel",
        inStock: true
    },
    {
        id: 74,
        name: "Hot Wheels 10-Car Pack",
        category: "toys",
        price: 999,
        mrp: 1499,
        discount: 33,
        rating: 4.8,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&h=800&fit=crop"
        ],
        description: "1:64 Scale Die-Cast Vehicles",
        features: ["10 unique cars", "Authentic details", "Durable metal", "Collectible"],
        brand: "Hot Wheels",
        inStock: true
    },
    {
        id: 75,
        name: "Barbie Dreamhouse Dollhouse",
        category: "toys",
        price: 19999,
        mrp: 24999,
        discount: 20,
        rating: 4.7,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1560969184-10fe8719e654?w=800&h=800&fit=crop"
        ],
        description: "3-Story Dollhouse with Elevator",
        features: ["75+ accessories", "Pool & slide", "Lights & sounds", "360-degree play"],
        brand: "Barbie",
        inStock: true
    },

    // Sports & Fitness
    {
        id: 76,
        name: "Yonex Muscle Power Badminton Racket",
        category: "sports",
        price: 2499,
        mrp: 3999,
        discount: 37,
        rating: 4.4,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1626224583764-847890e045b5?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1626224583764-847890e045b5?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&h=800&fit=crop"
        ],
        description: "Graphite racket for power",
        features: ["Isometric head", "Graphite shaft", "Full cover included", "24 lbs tension"],
        brand: "Yonex",
        inStock: true
    },
    {
        id: 77,
        name: "Nivia Storm Football",
        category: "sports",
        price: 499,
        mrp: 999,
        discount: 50,
        rating: 4.3,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1614632537423-1df03a0b0a57?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1614632537423-1df03a0b0a57?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1517466787929-bc90951d6db0?w=800&h=800&fit=crop"
        ],
        description: "Rubber football size 5",
        features: ["Water resistant", "Durable rubber", "All-weather play", "Official size"],
        brand: "Nivia",
        inStock: true
    },
    {
        id: 78,
        name: "Decathlon 20L Hiking Backpack",
        category: "sports",
        price: 999,
        mrp: 1499,
        discount: 33,
        rating: 4.7,
        ratingCount: 23456,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop"
        ],
        description: "Lightweight hiking bag",
        features: ["20L capacity", "Padded back", "10-year warranty", "Water repellent"],
        brand: "Quechua",
        inStock: true
    },
    {
        id: 79,
        name: "Cosco Cricket Bat",
        category: "sports",
        price: 899,
        mrp: 1299,
        discount: 30,
        rating: 4.2,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1531415074968-bc0886a14d51?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1531415074968-bc0886a14d51?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1593341646261-722a1ea4643e?w=800&h=800&fit=crop"
        ],
        description: "Full size tennis cricket bat",
        features: ["Kashmir Willow", "Rubber grip", "Lightweight", "Shock absorbing"],
        brand: "Cosco",
        inStock: true
    },
    {
        id: 80,
        name: "Urban Terrain Mountain Bike",
        category: "sports",
        price: 9999,
        mrp: 19999,
        discount: 50,
        rating: 4.5,
        ratingCount: 1234,
        image: "https://images.unsplash.com/photo-1576435728678-be95e39e565c?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1576435728678-be95e39e565c?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1485965120184-e224f723d62d?w=800&h=800&fit=crop"
        ],
        description: "27.5T Mountain Cycle",
        features: ["Disc brakes", "21 Shimona gears", "Front suspension", "Steel frame"],
        brand: "Urban Terrain",
        inStock: true
    },

    // --- NEW SHOP BY CATEGORY PRODUCTS (IDs 81-100) ---

    // Beauty & Personal Care
    {
        id: 81,
        name: "Maybelline New York Mascara",
        category: "beauty",
        price: 399,
        mrp: 549,
        discount: 27,
        rating: 4.5,
        ratingCount: 34567,
        image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=800&fit=crop"
        ],
        description: "Hypercurl Waterproof Mascara",
        features: ["Waterproof", "36H curl", "Black finish", "Volume building"],
        brand: "Maybelline",
        inStock: true
    },
    {
        id: 82,
        name: "Neutrogena Hydro Boost Water Gel",
        category: "beauty",
        price: 850,
        mrp: 1050,
        discount: 19,
        rating: 4.6,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&h=800&fit=crop"
        ],
        description: "50g Face Moisturizer",
        features: ["Hyaluronic Acid", "72hr hydration", "Oil free", "Dermatologist recommended"],
        brand: "Neutrogena",
        inStock: true
    },
    {
        id: 83,
        name: "Philips Simply Straight Straightener",
        category: "beauty",
        price: 2999,
        mrp: 3499,
        discount: 14,
        rating: 4.4,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800&h=800&fit=crop"
        ],
        description: "Heated straightening brush",
        features: ["Keratin infused", "Silk ProCare", "Fast heat up", "Large paddle"],
        brand: "Philips",
        inStock: true
    },
    {
        id: 84,
        name: "L'Oreal Paris Excellence Hair Color",
        category: "beauty",
        price: 599,
        mrp: 700,
        discount: 14,
        rating: 4.3,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1634453535607-8e6c7553f403?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1634453535607-8e6c7553f403?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1620917670397-a3313437ee8f?w=800&h=800&fit=crop"
        ],
        description: "Triple Care Hair Color",
        features: ["100% Grey coverage", "Pro-Keratin", "Ceramide", "Collagen"],
        brand: "L'Oreal",
        inStock: true
    },
    {
        id: 85,
        name: "Nivea Men Dark Spot Reduction Face Wash",
        category: "beauty",
        price: 249,
        mrp: 349,
        discount: 28,
        rating: 4.5,
        ratingCount: 23456,
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1556217256-dcd73a11bff6?w=800&h=800&fit=crop"
        ],
        description: "10x Vitamin C Effect",
        features: ["Dark spot reduction", "Clean pores", "Non-drying", "Fresh feeling"],
        brand: "Nivea",
        inStock: true
    },

    // Grocery & Gourmet
    {
        id: 86,
        name: "Ferrero Rocher Chocolate Box",
        category: "grocery",
        price: 899,
        mrp: 999,
        discount: 10,
        rating: 4.9,
        ratingCount: 45678,
        image: "https://images.unsplash.com/photo-1614088685112-0a760b7163dc?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1614088685112-0a760b7163dc?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1548130955-d3c26780c656?w=800&h=800&fit=crop"
        ],
        description: "Premium Hazelnut Chocolates 24 Pieces",
        features: ["Hazelnut filling", "Crispy wafer", "Milk chocolate", "Golden wrapper"],
        brand: "Ferrero",
        inStock: true
    },
    {
        id: 87,
        name: "Nescafe Gold Instant Coffee",
        category: "grocery",
        price: 649,
        mrp: 750,
        discount: 13,
        rating: 4.7,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1626075908298-9674681615b1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1626075908298-9674681615b1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop"
        ],
        description: "Rich and Smooth Coffee 100g",
        features: ["Arabica beans", "Freeze dried", "Rich aroma", "Glass jar"],
        brand: "Nescafe",
        inStock: true
    },
    {
        id: 88,
        name: "Twinings English Breakfast Tea",
        category: "grocery",
        price: 499,
        mrp: 599,
        discount: 16,
        rating: 4.8,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1563911892437-1c6c5819a538?w=800&h=800&fit=crop"
        ],
        description: "25 Tea Bags Box",
        features: ["Strong flavour", "Robust blend", "Traditional", "Sealed freshness"],
        brand: "Twinings",
        inStock: true
    },
    {
        id: 89,
        name: "Quaker Oats 1kg",
        category: "grocery",
        price: 199,
        mrp: 250,
        discount: 20,
        rating: 4.6,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1615486511484-92e590508b95?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1615486511484-92e590508b95?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1517650862521-d580d5348145?w=800&h=800&fit=crop"
        ],
        description: "100% Whole Grain Oats",
        features: ["High fibre", "Source of protein", "Heart healthy", "Quick cooking"],
        brand: "Quaker",
        inStock: true
    },
    {
        id: 90,
        name: "Nutella Hazelnut Spread",
        category: "grocery",
        price: 349,
        mrp: 399,
        discount: 12,
        rating: 4.8,
        ratingCount: 23456,
        image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1558554955-322f676442c7?w=800&h=800&fit=crop"
        ],
        description: "Original Hazelnut Spread 350g",
        features: ["Hazelnuts", "Cocoa", "Breakfast favorite", "Glass jar"],
        brand: "Nutella",
        inStock: true
    },

    // Pet Supplies
    {
        id: 91,
        name: "Pedigree Adult Dog Food",
        category: "pets",
        price: 2499,
        mrp: 2999,
        discount: 16,
        rating: 4.7,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585846416120-3a7354ed7d65?w=800&h=800&fit=crop"
        ],
        description: "Chicken & Vegetables 10kg",
        features: ["Complete nutrition", "Healthy shiny coat", "Strong muscles", "Digestive health"],
        brand: "Pedigree",
        inStock: true
    },
    {
        id: 92,
        name: "Whiskas Cat Food",
        category: "pets",
        price: 1999,
        mrp: 2499,
        discount: 20,
        rating: 4.6,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=800&fit=crop"
        ],
        description: "Ocean Fish 7kg",
        features: ["Adult cat +1 year", "Real fish", "Shiny coat", "Vision health"],
        brand: "Whiskas",
        inStock: true
    },
    {
        id: 93,
        name: "Royal Canin Puppy Food",
        category: "pets",
        price: 3499,
        mrp: 3999,
        discount: 12,
        rating: 4.8,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=800&fit=crop"
        ],
        description: "Medium Puppy 4kg",
        features: ["Immune system support", "Digestive health", "High energy", "Tailored kibble"],
        brand: "Royal Canin",
        inStock: true
    },
    {
        id: 94,
        name: "Drools Biscuit Treats",
        category: "pets",
        price: 299,
        mrp: 399,
        discount: 25,
        rating: 4.3,
        ratingCount: 2345,
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?w=800&h=800&fit=crop"
        ],
        description: "Chicken Flavor Jar",
        features: ["Crunchy texture", "Tartar control", "Vitamin enriched", "Training treat"],
        brand: "Drools",
        inStock: true
    },
    {
        id: 95,
        name: "PetVogue Dog Harness",
        category: "pets",
        price: 799,
        mrp: 1299,
        discount: 38,
        rating: 4.4,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1605639156481-244775d696cc?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1605639156481-244775d696cc?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=800&fit=crop"
        ],
        description: "Reflective No Pull Harness",
        features: ["Breathable mesh", "Adjustable straps", "Reflective strip", "Padded"],
        brand: "PetVogue",
        inStock: true
    },

    // Automotive
    {
        id: 96,
        name: "70mai Dash Cam Pro Plus",
        category: "automotive",
        price: 9999,
        mrp: 11999,
        discount: 16,
        rating: 4.5,
        ratingCount: 4567,
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1593121925328-369cc8459c08?w=800&h=800&fit=crop"
        ],
        description: "2.7K 1944P Video Recorder",
        features: ["ADAS GPS", "Night vision", "24h parking", "App control"],
        brand: "70mai",
        inStock: true
    },
    {
        id: 97,
        name: "Michelin Tyre Inflator",
        category: "automotive",
        price: 3499,
        mrp: 4999,
        discount: 30,
        rating: 4.6,
        ratingCount: 5678,
        image: "https://images.unsplash.com/photo-1583253683015-7489582d90d8?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1583253683015-7489582d90d8?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1563289098-6da93c200936?w=800&h=800&fit=crop"
        ],
        description: "Digital High Power Tyre Inflator",
        features: ["Digital gauge", "Auto shut off", "LED light", "Fast inflation"],
        brand: "Michelin",
        inStock: true
    },
    {
        id: 98,
        name: "Shell Helix Ultra Engine Oil",
        category: "automotive",
        price: 2499,
        mrp: 2999,
        discount: 16,
        rating: 4.8,
        ratingCount: 8901,
        image: "https://images.unsplash.com/photo-1562916174-275d27871b63?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1562916174-275d27871b63?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&h=800&fit=crop"
        ],
        description: "5W-40 Fully Synthetic Oil 3.5L",
        features: ["Active cleansing", "Superior wear protection", "Long engine life", "Better fuel economy"],
        brand: "Shell",
        inStock: true
    },
    {
        id: 99,
        name: "Godrej Aer Twist Car Freshener",
        category: "automotive",
        price: 299,
        mrp: 349,
        discount: 14,
        rating: 4.4,
        ratingCount: 12345,
        image: "https://images.unsplash.com/photo-1592164479532-6bf6f165e317?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1592164479532-6bf6f165e317?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1549488339-a9c9b583f703?w=800&h=800&fit=crop"
        ],
        description: "Rich Irish Cocktail Fragrance",
        features: ["Gel technology", "Spill proof", "Long lasting", "Dashboard mount"],
        brand: "Godrej",
        inStock: true
    },
    {
        id: 100,
        name: "Bosch Aerotwin Wiper Blades",
        category: "automotive",
        price: 899,
        mrp: 1299,
        discount: 30,
        rating: 4.5,
        ratingCount: 3456,
        image: "https://images.unsplash.com/photo-1621259598284-ad4b6389f417?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1621259598284-ad4b6389f417?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1592398436402-23b9cb75a894?w=800&h=800&fit=crop"
        ],
        description: "Frameless Wiper Blades Pair",
        features: ["Silent wiping", "All weather", "Long life", "Easy installation"],
        brand: "Bosch",
        inStock: true
    },
    {
        id: 101, // Matches US$4.20 approx ₹350
        name: "Fresh Organic Vegetable Basket",
        category: "fruits-veg",
        price: 350,
        mrp: 499,
        discount: 30,
        rating: 4.8,
        ratingCount: 120,
        image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
        ],
        description: "A curated basket of fresh, organic seasonal vegetables.",
        features: ["100% Organic", "Farm Fresh", "Pesticide Free", "Daily Harvest"],
        brand: "Organic Farms",
        inStock: true
    },
    {
        id: 102, // Matches US$4.80 approx ₹400
        name: "Premium Fruit Selection",
        category: "fruits-veg",
        price: 400,
        mrp: 550,
        discount: 27,
        rating: 4.7,
        ratingCount: 95,
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Assortment of premium quality seasonal fruits.",
        features: ["Rich in Vitamins", "Handpicked", "Naturally Ripened", "Sweet & Juicy"],
        brand: "Nature's Best",
        inStock: true
    },
    {
        id: 103,
        name: "Exotic Berries Pack",
        category: "fruits-veg",
        price: 450,
        mrp: 600,
        discount: 25,
        rating: 4.9,
        ratingCount: 45,
        image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Fresh blueberries, strawberries, and raspberries.",
        features: ["High Antioxidants", "Imported Quality", "Freshly packed"],
        brand: "Berry World",
        inStock: true
    },
    {
        id: 104,
        name: "Green Leafy Bundle",
        category: "fruits-veg",
        price: 300,
        mrp: 400,
        discount: 25,
        rating: 4.6,
        ratingCount: 88,
        image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Fresh spinach, kale, and lettuce bundle.",
        features: ["Iron Rich", "Farm to Table", "Crisp & Fresh"],
        brand: "Green Valley",
        inStock: true
    }
];

export const getProductById = (id: number): Product | undefined => {
    return allProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string, limit?: number): Product[] => {
    const filtered = allProducts.filter(product => product.category === category);
    return limit ? filtered.slice(0, limit) : filtered;
};

export const getRelatedProducts = (productId: number, limit: number = 6): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];

    return allProducts
        .filter(p => p.category === product.category && p.id !== productId)
        .slice(0, limit);
};

export const getJustForYouProducts = (limit: number = 10, excludeIds: number[] = []): Product[] => {
    // Filter out excluded products and shuffle
    const availableProducts = allProducts.filter(p => !excludeIds.includes(p.id));
    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
};

// Helper function to generate default reviews for products
const generateDefaultReviews = (productName: string, rating: number): Review[] => {
    const reviewTemplates = [
        {
            positive: [
                `Excellent product! ${productName} exceeded my expectations. Highly recommend!`,
                `Amazing quality! Very satisfied with this purchase. Worth every rupee.`,
                `Best purchase I've made this year. The quality is outstanding!`,
                `Superb product! Exactly as described. Very happy with my purchase.`,
                `Fantastic! The build quality and performance are top-notch.`
            ],
            neutral: [
                `Good product overall. Does what it's supposed to do.`,
                `Decent purchase. Met my expectations but nothing extraordinary.`,
                `Satisfactory product. Good value for money.`,
                `Pretty good. A few minor issues but generally satisfied.`,
                `Okay product. Works well but could be better in some aspects.`
            ]
        }
    ];

    const userNames = [
        "Rahul Verma", "Anjali Singh", "Vikram Malhotra", "Pooja Nair",
        "Arjun Reddy", "Kavya Iyer", "Sanjay Gupta", "Meera Kapoor",
        "Karthik Menon", "Divya Sharma", "Rohan Joshi", "Nisha Patel"
    ];

    const reviews: Review[] = [];
    const numReviews = Math.floor(Math.random() * 2) + 3; // 3-4 reviews

    for (let i = 0; i < numReviews; i++) {
        const isPositive = rating >= 4.0;
        const templates = isPositive ? reviewTemplates[0].positive : reviewTemplates[0].neutral;
        const randomComment = templates[Math.floor(Math.random() * templates.length)];

        reviews.push({
            id: i + 1,
            userName: userNames[Math.floor(Math.random() * userNames.length)],
            rating: rating >= 4.5 ? 5 : (rating >= 4.0 ? (Math.random() > 0.5 ? 5 : 4) : 4),
            date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            comment: randomComment,
            helpful: Math.floor(Math.random() * 200) + 50
        });
    }

    return reviews;
};

// Get product reviews with fallback to generated reviews
export const getProductReviews = (productId: number): Review[] => {
    const product = getProductById(productId);
    if (!product) return [];

    // Return existing reviews or generate default ones
    return product.reviews || generateDefaultReviews(product.name, product.rating);
};
