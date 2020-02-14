import { ActionTree } from 'vuex';
import { ProductState, FilterSetOption, CategorySetOption, FilterOptions } from './types';
import { RootState } from '../types';
import { PRODUCTS_ADD_ALL, FILTER_SET, FILTER_REMOVE, CATEGORY_SET_SELECTED, CATEGORY_ADD_ALL, PRODUCT_UPDATE, SKIP_SET, PRODUCTS_SEARCH } from './mutation-types';
import { axiosInstance } from '@/main';
import { mockProducts } from '@/data/mockdata';
import ApiProduct from '@/services/api'


export const actions: ActionTree<ProductState, RootState> = {
    [PRODUCTS_ADD_ALL]({ commit, dispatch, getters }, payload: { skip: number, take: number }) {


        ApiProduct.getProducts(payload.skip, payload.take)
            .then(response => {
                commit(PRODUCTS_ADD_ALL, response);
            })
            .catch(() => {
                commit(PRODUCTS_ADD_ALL, mockProducts);
            });

    },
    async [FILTER_SET]({ commit, dispatch }, payload: FilterSetOption) {
        commit(FILTER_SET, payload);
        dispatch(PRODUCTS_SEARCH);
    },
    [SKIP_SET]({ commit }, skip: number) {
        commit(SKIP_SET, skip);
    },
    [CATEGORY_ADD_ALL]({ commit }) {
        ApiProduct.getCategories()
            .then(response => {
                commit(CATEGORY_ADD_ALL, response);
            })
    },
    [PRODUCT_UPDATE]({ commit }, id: number) {
        ApiProduct.getSingleProduct(id)
            .then((response) => {
                commit(PRODUCT_UPDATE, { id: id, product: response })
            });
    },
    [CATEGORY_SET_SELECTED]({ commit, dispatch }, payload: CategorySetOption) {
        commit(FILTER_SET, { Property: 'Category', Value: payload.Category });
        if (payload.SubCategory !== undefined) {
            commit(FILTER_SET, { Property: 'SubCategory', Value: payload.SubCategory });
        }
        dispatch(PRODUCTS_SEARCH);
    },
    [FILTER_REMOVE](context, key: keyof FilterOptions) {
        context.commit(FILTER_REMOVE, key);
    },
    [PRODUCTS_SEARCH]({ commit, getters }) {
        ApiProduct.searchProducts(getters.getFilter);
    },
};