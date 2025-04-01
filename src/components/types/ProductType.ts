

export interface CategoryType {
    category_id: number,
    name: string,
    description: string,
    image: string,
}

export interface ProductType {
    product_id: number,
    category_id: number,
    name: string,
    description: string,
    price: string,
    image: string,
    is_available: number,
    created_at: string,
    updated_at: string,
    points_earned: number,
    category: CategoryType;
}