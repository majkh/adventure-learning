import { MutationTree } from 'vuex';
import { ProductState, Product } from './types';
import { PRODUCTS_ADD_ALL, PRODUCT_UPDATE, SKIP_SET, PRODUCTS_SET_SYNCED, PRODUCT_ADD_TO_CART } from './mutation-types';

export const mutations: MutationTree<ProductState> = {
    [PRODUCTS_ADD_ALL](state: ProductState, payload: Array<Product>) {
        state.products = payload;
    },
    [PRODUCT_UPDATE](state: ProductState, payload: { id: number, product: Product }) {
        const index = state.products.findIndex((product => product.productId === payload.id));
        if (index > -1) {
            state.products.splice(index, 1, payload.product);
        }
        else {
            state.products = [...state.products, payload.product];
        }
    },
    [SKIP_SET](state: ProductState, skip: number) {
        state.skip = skip
    },
    [PRODUCTS_SET_SYNCED](state: ProductState, value: number) {
        state.synced = value;
    },
    [PRODUCT_ADD_TO_CART](state: ProductState, payload: Product) {
        state.cart.push(payload);
    }
};