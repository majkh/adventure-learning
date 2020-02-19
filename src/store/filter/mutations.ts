import { MutationTree } from 'vuex';
import { FilterState, FilterSetOption, ProductCategories, FilterOptions } from './types';
import { FILTER_SET, CATEGORY_ADD_ALL, CATEGORY_SET_SYNCED, FILTER_CLEAR } from './mutation-types';

export const mutations: MutationTree<FilterState> = {
    [FILTER_SET](state: FilterState, payload: FilterSetOption) {
        state.currentFilter[payload.Property] = payload.Value ? payload.Value.toString() : undefined;
    },
    [CATEGORY_ADD_ALL](state: FilterState, payload: Array<ProductCategories>) {
        state.productCategories = payload;
    },
    [CATEGORY_SET_SYNCED](state: FilterState, value: number) {
        state.synced = value;
    },
    [FILTER_CLEAR](state: FilterState) {
        state.currentFilter = new FilterOptions()
    }
};