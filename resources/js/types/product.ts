export type Product = {
    id: number;
    user_id: number;
    name: string;
    sku: string;
    price: string;
    stock: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
};
