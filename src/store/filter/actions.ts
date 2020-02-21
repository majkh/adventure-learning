import { ActionTree } from 'vuex';
import { FilterState, FilterSetOption, CategorySetOption, FilterOptions } from './types';
import { RootState } from '../types';
import { FILTER_SET, FILTER_REMOVE, CATEGORY_SET_SELECTED, CATEGORY_ADD_ALL, CATEGORY_SET_SYNCED, FILTER_CLEAR, FILTER_SET_AND_SEARCH, SEARCH_ADD, } from './mutation-types';
import { productCategories } from '@/data/mockdata';
import ApiProduct from '@/services/api'
import moment from 'moment'
import { PRODUCTS_SEARCH } from '../product/mutation-types';

let shouldFetch = (value?: number, compare = 3, unit: 'minutes' | 'seconds' | 'hours' | 'days' = 'minutes'): boolean => {
    if (value) {
        let now = moment().subtract(compare, unit).valueOf();
        return value < now
    }
    return true
}

export const actions: ActionTree<FilterState, RootState> = {

    [FILTER_SET]({ commit }, payload: FilterSetOption) {
        commit(FILTER_SET, payload);
    },
    async [FILTER_SET_AND_SEARCH]({ dispatch, state }, payload: FilterSetOption) {
        await dispatch(FILTER_SET, payload);
        dispatch('products/' + PRODUCTS_SEARCH, state.currentFilter, { root: true });
    },
    [CATEGORY_ADD_ALL]({ commit, state }) {
        if (shouldFetch(state.synced, 12, 'hours')) {
            ApiProduct.getCategories()
                .then(response => {
                    commit(CATEGORY_ADD_ALL, [...[{
                        productCategoryID: undefined,
                        name: 'All',
                    }], ...response]);
                    commit(CATEGORY_SET_SYNCED)
                })
                .catch(() => {
                    // commit(CATEGORY_ADD_ALL, productCategories)
                })
        }
    },
    async [CATEGORY_SET_SELECTED]({ commit, dispatch, state }, payload: CategorySetOption) {
        commit(FILTER_CLEAR);
        const setCategoryPromise = dispatch(FILTER_SET, { Property: 'Category', Value: payload.Category });
        const setSubCategoryPromise = dispatch(FILTER_SET, { Property: 'SubCategory', Value: payload.SubCategory });

        Promise.all([setCategoryPromise, setSubCategoryPromise]).then(() => {

            dispatch('products/' + PRODUCTS_SEARCH, state.currentFilter, { root: true });
        });
    },
    [FILTER_REMOVE](context, key: keyof FilterOptions) {
        context.commit(FILTER_REMOVE, key);
    },
    [SEARCH_ADD]({ commit }, payload: string) {
        commit(SEARCH_ADD, payload)
    }
};