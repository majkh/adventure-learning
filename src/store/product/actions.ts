import { ActionTree } from 'vuex';
import { ProductState, FilterSetOption, CategorySetOption, FilterOptions, Product } from './types';
import { RootState } from '../types';
import { PRODUCTS_ADD_ALL, FILTER_SET, FILTER_REMOVE, CATEGORY_SET_SELECTED, CATEGORY_ADD_ALL, PRODUCT_UPDATE, SKIP_SET, PRODUCTS_SEARCH, PRODUCTS_SET_SYNCED } from './mutation-types';
import { mockProducts, productCategories } from '@/data/mockdata';
import ApiProduct from '@/services/api'
import moment from 'moment'

let shouldFetch = (value?: number, compare = 3, unit: 'minutes' | 'seconds' | 'hours' | 'days' = 'minutes'): boolean => {
    if (value) {
        let now = moment().subtract(compare, unit).valueOf();
        return value < now
    }
    return true
}

export const actions: ActionTree<ProductState, RootState> = {
    [PRODUCTS_ADD_ALL]({ commit, state, dispatch }, payload: { skip: number, take: number }) {

        if (shouldFetch(state.synced)) {
            ApiProduct.getProducts(payload.skip, payload.take)
                .then(response => {
                    commit(PRODUCTS_ADD_ALL, response);
                    // commit(PRODUCTS_ADD_ALL, mockProducts);
                    commit(PRODUCTS_SET_SYNCED, moment().valueOf());
                })
                .catch(() => {

                    commit(PRODUCTS_SET_SYNCED, moment().valueOf());
                    commit(PRODUCTS_ADD_ALL, mockProducts);
                });
        }


    },
    async [FILTER_SET]({ commit, dispatch }, payload: FilterSetOption) {
        commit(FILTER_SET, payload);
        dispatch(PRODUCTS_SEARCH);
    },
    [SKIP_SET]({ commit }, skip: number) {
        commit(SKIP_SET, skip);
    },
    [CATEGORY_ADD_ALL]({ commit, state }) {
        if (state.productCategories) {
            ApiProduct.getCategories()
                .then(response => {
                    commit(CATEGORY_ADD_ALL, response);
                })
                .catch(() => {
                    commit(CATEGORY_ADD_ALL, productCategories)
                })
        } else {
            ApiProduct.getCategories()
                .then(response => {
                    commit(CATEGORY_ADD_ALL, response);
                })
                .catch(() => {
                    commit(CATEGORY_ADD_ALL, productCategories)
                })
        }
    },
    [PRODUCT_UPDATE]({ commit, state }, id: number) {
        if (!state.products.find(product => {
            return product.productId === id && shouldFetch(product.updated, 1, 'hours')
        })) {
            ApiProduct.getSingleProduct(id)
                .then((response: Product) => {
                    response.updated = moment().valueOf()
                    commit(PRODUCT_UPDATE, { id: id, product: response })
                });
        }

    },
    [CATEGORY_SET_SELECTED]({ commit, dispatch }, payload: CategorySetOption) {
        commit(FILTER_SET, { Property: 'Category', Value: payload.Category });
        commit(FILTER_SET, { Property: 'SubCategory', Value: payload.SubCategory });

        dispatch(PRODUCTS_SEARCH);
    },
    [FILTER_REMOVE](context, key: keyof FilterOptions) {
        context.commit(FILTER_REMOVE, key);
    },
    [PRODUCTS_SEARCH]({ commit, getters }) {
        ApiProduct.searchProducts(getters.getFilter)
            .then(response => {
                // commit(PRODUCTS_ADD_ALL, response);
                commit(PRODUCTS_ADD_ALL, mockProducts);
            })
            .catch(() => {
                commit(PRODUCTS_ADD_ALL, mockProducts);
            });
    }
};