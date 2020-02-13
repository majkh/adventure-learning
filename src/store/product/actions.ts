import { ActionTree } from 'vuex';
import { ProductState, FilterSetOption, CategorySetOption, FilterOptions } from './types';
import { RootState } from '../types';
import { PRODUCTS_ADD_ALL, FILTER_SET, FILTER_REMOVE, CATEGORY_SET_SELECTED, CATEGORY_ADD_ALL, PRODUCT_UPDATE, SKIP_SET } from './mutation-types';
import { axiosInstance } from '@/main';
import { mockProducts } from '@/data/mockdata';


export const actions: ActionTree<ProductState, RootState> = {
    [PRODUCTS_ADD_ALL]({ commit, dispatch, getters }, payload: { skip: number, take: number }) {
        if (getters.getSkip !== payload.skip) {
            dispatch(SKIP_SET, payload.skip)
            axiosInstance
                .get("product")
                .then(response => {
                    console.log(response)
                    commit(PRODUCTS_ADD_ALL, response.data);
                })
                .catch(error => {
                    //TODO: remove mockdata

                    console.log(error)
                    commit(PRODUCTS_ADD_ALL, mockProducts);
                });
        }
    },
    [FILTER_SET]({ commit }, payload: FilterSetOption) {
        commit(FILTER_SET, payload);
    },
    [SKIP_SET]({ commit }, skip: number) {
        commit(SKIP_SET, skip);
    },
    [CATEGORY_ADD_ALL]({ commit }, payload: CategorySetOption) {
        axiosInstance
            .get("product/category")
            .then(response => {
                commit(CATEGORY_ADD_ALL, response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    async [PRODUCT_UPDATE]({ commit }, id: number) {
        return axiosInstance.get(`product/${id}`).then(response => {
            commit(PRODUCT_UPDATE, { id: id, product: response.data })
        })
    },
    async [CATEGORY_SET_SELECTED]({ dispatch }, payload: CategorySetOption) {
        await dispatch(FILTER_SET, { Property: 'Category', Value: payload.Category });
        if (payload.SubCategory !== undefined) {
            await dispatch(FILTER_SET, { Property: 'SubCategory', Value: payload.SubCategory });
        }
        dispatch('searchProducts');
    },
    [FILTER_REMOVE](context, key: keyof FilterOptions) {
        context.commit(FILTER_REMOVE, key);
    },
    searchProducts(context) {
        axiosInstance
            .get("v1/bpi/currentprice.json")
            .then(response => {
                console.log("Debug", response);
            })
            .catch(error => {
                console.log(error);
            });
    },
};