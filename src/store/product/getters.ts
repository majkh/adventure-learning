import { GetterTree } from 'vuex';
import { ProductState, Product } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProductState, RootState> = {
    getProductById: (state) => (id: number) => {
        return state.products.find(product => product.productId === id)
    },
};