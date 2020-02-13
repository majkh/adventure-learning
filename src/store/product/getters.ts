import { GetterTree } from 'vuex';
import { ProductState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProductState, RootState> = {
    getProductById: (state) => (id: number) => {
        return state.products.find(product => product.productId === id)
    },
    getProductCategories: state => {
        return state.productCategories
    },
    getFilter: state => {
        return state.currentFilter
    },
    getTake: state => {
        return state.take
    },
    getSkip: state => {
        return state.skip
    }
};