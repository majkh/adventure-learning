import { GetterTree } from 'vuex';
import { ProductState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProductState, RootState> = {
    expensiveProducts: state => {
        return state.products.filter(product => product.Price >= 100)
    },
    getProductById: (state) => (id: string) => {
        return state.products.find(product => product.Id === id) // fetch api if not exists
    },
    getProductCategories: state => {
        return state.productCategories
    },
    getFilter: state => {
        return state.currentFilter
    }
};