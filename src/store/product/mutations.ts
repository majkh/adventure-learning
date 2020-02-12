import { MutationTree } from 'vuex';
import { ProductState, Product, FilterSetOption } from './types';
import { ADD_ALL_PRODUCTS, SET_FILTER, ADD_TO_CART } from './mutation-types';

export const mutations: MutationTree<ProductState> = {
    [ADD_ALL_PRODUCTS](state, payload: Array<Product>) {
        state.products = payload;
    },
    [SET_FILTER](state, payload: FilterSetOption) {
        console.log("Debug", "Categories", state.currentFilter)
        state.currentFilter[payload.Property] = payload.Value;
    },
    [ADD_TO_CART](state, payload: FilterSetOption) {
        console.log("Debug", "Categories", state.currentFilter)
        state.currentFilter[payload.Property] = payload.Value;
    }
};