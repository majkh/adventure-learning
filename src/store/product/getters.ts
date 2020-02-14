import { GetterTree } from 'vuex';
import { ProductState, Product } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProductState, RootState> = {
    getProductById: (state) => (id: number) => {
        return state.products.find(product => product.productId === id)
    },
    getProductCategories: state => {
        return state.productCategories
    },
    getCategoryActive: (state) => (categoryId: string) => {
        return state.currentFilter.Category === categoryId.toString()
    },
    getSubCategoryActive: (state) => (categoryId: string, subCategoryId: string) => {
        return state.currentFilter.Category === categoryId.toString() && state.currentFilter.SubCategory === subCategoryId.toString()
    },
    getFilter: state => {
        return state.currentFilter
    },
    getTake: state => {
        return state.take
    },
    getSkip: state => {
        return state.skip
    },
    getFilterValues: (state, key: keyof Product) => {
        return state.products.map(product => product[key])
    }
};