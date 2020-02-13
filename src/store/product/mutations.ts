import { MutationTree } from 'vuex';
import { ProductState, Product, FilterSetOption, CategorySetOption, ProductCategories } from './types';
import { ADD_ALL_PRODUCTS, SET_FILTER, ADD_TO_CART, SET_CATEGORIES, UPDATE_PRODUCT } from './mutation-types';

export const mutations: MutationTree<ProductState> = {
    [ADD_ALL_PRODUCTS](state: ProductState, payload: Array<Product>) {
        state.products = payload;
    },
    [UPDATE_PRODUCT](state: ProductState, payload: { id: number, product: Product }) {
        const index = state.products.findIndex((product => product.productId === payload.id));
        if (index > -1) {
            state.products.splice(index, 1, payload.product);
        }
        else {
            state.products = [...state.products, payload.product];
        }
    },
    [SET_FILTER](state: ProductState, payload: FilterSetOption) {
        console.log("Debug", "Categories", state.currentFilter)
        state.currentFilter[payload.Property] = payload.Value;
    },
    [SET_CATEGORIES](state: ProductState, payload: Array<ProductCategories>) {
        state.productCategories = payload;
    },
    [ADD_TO_CART](state: ProductState, payload: FilterSetOption) {
        console.log("Debug", "Categories", state.currentFilter)
        state.currentFilter[payload.Property] = payload.Value;
    }
};