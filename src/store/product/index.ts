import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProductState, Product } from './types';
import { RootState } from '../types';
import { Moment } from 'moment'

export const state: ProductState = {
    products: new Array<Product>(),
    skip: -1,
    take: 0,
    cart: new Array<Product>(),
    synced: -1,
};

const namespaced: true = true;

export const productModule: Module<ProductState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};