import { GetterTree } from 'vuex';
import { ProductState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProductState, RootState> = {
    getProductById: (state) => (id: number) => {
        const debugProduct = state.products.find(product => {
            return product.productId === id
        })
        return state.products.find(product => product.productId === id) // fetch api if not exists
    },
    getProductCategories: state => {
        return state.productCategories
    },
    getFilter: state => {
        return state.currentFilter
    }
};