export interface FilterState {
    productCategories?: Array<ProductCategories>;
    currentFilter: FilterOptions;
    searches: Array<string>;
    synced: number;
}


export interface CategorySetOption {
    Category: string;
    SubCategory?: string;
}

export interface FilterSetOption {
    Property: keyof FilterOptions;
    Value?: string;
}

export class FilterOptions {
    category?: string;
    subCategory?: string;
    name?: string;
    maxPrice?: string;
    minPrice?: string;
    color?: string;
    size?: string;
    style?: string;
    constructor() {
        this.category = undefined;
        this.subCategory = undefined;
        this.name = undefined;
        this.maxPrice = undefined;
        this.minPrice = undefined;
        this.color = undefined;
        this.size = undefined;
        this.style = undefined;
    }

}

interface ProductSubCategories {
    productSubcategoryId: number;
    name: string;
}

export interface ProductCategories {
    productCategoryID: number;
    name: string;
    subCategory?: Array<ProductSubCategories>;
}
