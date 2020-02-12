import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProductState, Product, FilterOptions } from './types';
import { RootState } from '../types';
import { productCategories } from '@/data/mockdata';

export const state: ProductState = {
    products: new Array<Product>(),
    productCategories: productCategories,
    currentFilter: new FilterOptions(),
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