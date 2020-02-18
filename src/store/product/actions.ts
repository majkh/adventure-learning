import { ActionTree } from 'vuex';
import { ProductState, FilterSetOption, CategorySetOption, FilterOptions } from './types';
import { RootState } from '../types';
import { PRODUCTS_ADD_ALL, FILTER_SET, FILTER_REMOVE, CATEGORY_SET_SELECTED, CATEGORY_ADD_ALL, PRODUCT_UPDATE, SKIP_SET, PRODUCTS_SEARCH, PRODUCTS_SET_SYNCED } from './mutation-types';
import { mockProducts, productCategories } from '@/data/mockdata';
import ApiProduct from '@/services/api'
import moment, { Moment } from 'moment'
import { state } from '.';

let shouldFetch = (value?: Moment, compare = -40): boolean => {
    console.log("DEBUG shouldFetch", value)
    if (value) {
        let now = moment();

        console.log("Debug fetch", moment(value).clone().valueOf() < now.clone().add(compare, 'seconds').valueOf())
        return moment(value).clone().valueOf() < now.clone().add(compare, 'seconds').valueOf()
    }
    return true
}

export const actions: ActionTree<ProductState, RootState> = {
    async [PRODUCTS_ADD_ALL]({ commit, dispatch, getters }, payload: { skip: number, take: number }) {

        commit(PRODUCTS_ADD_ALL, mockProducts);
        if (shouldFetch(state.synced)) {

            await commit(PRODUCTS_SET_SYNCED, moment());
        } else {

            console.log("Debug shouldfetch", state)
            console.log("Debug shouldfetch", state.synced!.clone().toString())
        }
        // ApiProduct.getProducts(payload.skip, payload.take)
        //     .then(response => {
        //         commit(PRODUCTS_ADD_ALL, response);
        //         // commit(PRODUCTS_ADD_ALL, mockProducts);
        //         // commit(PRODUCTS_SET_SYNCED, moment());
        //     })
        //     .catch(() => {

        //         // commit(PRODUCTS_SET_SYNCED, moment());
        //         commit(PRODUCTS_ADD_ALL, mockProducts);
        //     });


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
            console.log("DEBUG CATEGORIES ALREADY LOADED")
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
        let now = moment();
        console.log("DEBUG TIME BEFORE IF", now.toISOString(), "-------", now.subtract(30, 'seconds').toISOString())
        console.log("DEBUG TIME BEFORE IF", now.valueOf() < now.add(-30, 'seconds').valueOf())
        if (!state.products.find(product => {
            if (product.productId === id) {
                console.log("DEBUG TIME", shouldFetch(product.updated))
            }
            return product.productId === id && shouldFetch(product.updated)
        })) {
            console.log("DEBUG no need for fetch", state.products)
            ApiProduct.getSingleProduct(id)
                .then((response) => {
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
    },
    [PRODUCTS_SET_SYNCED]({ commit }) {
        commit(PRODUCTS_SET_SYNCED);
    }
};