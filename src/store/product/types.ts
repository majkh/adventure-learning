export interface ProductState {
    products: Array<Product>;
    productCategories?: Array<ProductCategories>;
    currentFilter: FilterOptions;
    cart?: Array<Product>;
}

export interface Product {
    Id: string;
    Name: string;
    Quantity: number;
    Price: number;
    Description?: string;
}

export interface CategorySetOption {
    Category: string;
    SubCategory?: string;
}

export const CreateCategorySetOption = (cat: string, sub: string): CategorySetOption => {
    return { Category: cat, SubCategory: sub }
}

export interface FilterSetOption {
    Property: keyof FilterOptions;
    Value: string;
}

export class FilterOptions {
    Category: string;
    SubCategory: string;
    PriceMax: string;
    PriceMin: string;
    constructor() {
        this.Category = '';
        this.SubCategory = '';
        this.PriceMax = '';
        this.PriceMin = '';
    }
}

export interface ProductSubCategories {
    Id: number;
    Name: string;
}

export interface ProductCategories {
    Id: number;
    Name: string;
    SubCategories?: Array<ProductSubCategories>;
}