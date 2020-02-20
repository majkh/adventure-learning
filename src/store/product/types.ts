import { Moment } from 'moment'


export interface ProductState {
    products: Array<Product>;
    take: number;
    skip: number;
    cart: Array<Product>;
    synced?: number;
}

interface ProductPhoto {
    productPhotoID: number;
    thumbNailPhoto: string;
    thumbNailPhotoFileName: string;
    largePhoto: string;
    largePhotoFileName: string;
}

export interface ProductReview {
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
    review?: Array<ProductReview>;
    updated?: number;
}

