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
    Category?: string;
    SubCategory?: string;
    Name?: string;
    PriceMax?: string;
    PriceMin?: string;
    Color?: string;
    Size?: string;
    Style?: string;
    constructor() {
        this.Category = undefined;
        this.SubCategory = undefined;
        this.Name = undefined;
        this.PriceMax = undefined;
        this.PriceMin = undefined;
        this.Color = undefined;
        this.Size = undefined;
        this.Style = undefined;
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
