import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProductState, Product, FilterOptions, ProductCategories } from './types';
import { RootState } from '../types';

export const state: ProductState = {
    products: new Array<Product>(),
    productCategories: undefined,
    currentFilter: new FilterOptions(),
    skip: -1,
    take: 0,
    cart: undefined
};

const namespaced: boolean = true;

export const productModule: Module<ProductState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};