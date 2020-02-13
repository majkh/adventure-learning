export interface ProductState {
    products: Array<Product>;
    productCategories?: Array<ProductCategories>;
    currentFilter: FilterOptions;
    cart?: Array<Product>;
}

interface ProductPhoto {
    productPhotoID: number;
    thumbNailPhoto: string;
    thumbNailPhotoFileName: string;
    largePhoto: string;
    largePhotoFileName: string;
}

interface ProductReview {
    productReviewID: number,
    productId: number,
    reviewerName: string,
    reviewDate: Date,
    emailAddress: string,
    rating: number,
    comments: string
}


export interface Product {
    productId: number;
    name: string;
    productNumber: string;
    color?: string;
    standardCost: 0;
    listPrice: 0;
    size?: string;
    weight: 0;
    productLine?: string;
    class?: string;
    style?: string;
    subCategory?: string;
    model?: string;
    photo: ProductPhoto;
    review?: ProductReview;
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
    productSubcategoryId: number;
    name: string;
}

export interface ProductCategories {
    productCategoryID: number;
    name: string;
    subCategory?: Array<ProductSubCategories>;
}