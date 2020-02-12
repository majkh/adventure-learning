
// export interface IFilterOptions {
//     Category: string;
//     SubCategory: string;
//     PriceMax: string;
//     PriceMin: string;
// }

// export class FilterOptions implements IFilterOptions {
//     Category: string;
//     SubCategory: string;
//     PriceMax: string;
//     PriceMin: string;
//     constructor() {
//         this.Category = '';
//         this.SubCategory = '';
//         this.PriceMax = '';
//         this.PriceMin = '';
//     }
// }

// export interface IFilterSetOption {
//     Property: string;
//     Value: string;
// }

// export class FilterSetOption implements IFilterSetOption {
//     Property: keyof FilterOptions;
//     Value: string;
//     constructor(key: keyof FilterOptions, value: string) {
//         this.Property = key;
//         this.Value = value;
//     }
// }

// export class CategorySetOption {
//     Category: string;
//     SubCategory?: string;
//     constructor(category: string, subcategory?: string) {
//         this.Category = category;
//         this.SubCategory = subcategory;
//     }
// }