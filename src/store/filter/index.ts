import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { FilterState, FilterOptions } from './types';
import { RootState } from '../types';

export const state: FilterState = {
    productCategories: undefined,
    currentFilter: new FilterOptions(),
    synced: -1
}

const namespaced: true = true;

export const filterModule: Module<FilterState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};