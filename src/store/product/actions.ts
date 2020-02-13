import { ActionTree } from 'vuex';
import axios from 'axios';
import { ProductState, Product, FilterSetOption, CategorySetOption, FilterOptions } from './types';
import { RootState } from '../types';
import { ADD_ALL_PRODUCTS, SET_FILTER, REMOVE_FILTER, SET_SELECTED_CATEGORY, SET_CATEGORIES, UPDATE_PRODUCT } from './mutation-types';
import { axiosInstance } from '@/main';


export const actions: ActionTree<ProductState, RootState> = {
    [ADD_ALL_PRODUCTS](context, payload: Array<Product>) {
        console.log("Debug PRODUCTS", payload)
        context.commit(ADD_ALL_PRODUCTS, payload);
    },
    [SET_FILTER](context, payload: FilterSetOption) {
        context.commit(SET_FILTER, payload);
    },
    setAllCategories(context, payload: CategorySetOption) {
        axiosInstance
            .get("product/category")
            .then(response => {
                context.commit(SET_CATEGORIES, response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    async [UPDATE_PRODUCT](context, id: number) {
        return axiosInstance.get(`product/${id}`).then(response => {
            context.commit(UPDATE_PRODUCT, { id: id, product: response.data })
        })
    },
    async setCategory(context, payload: CategorySetOption) {
        await context.dispatch(SET_FILTER, { Property: 'Category', Value: payload.Category });
        if (payload.SubCategory !== undefined) {
            await context.dispatch(SET_FILTER, { Property: 'SubCategory', Value: payload.SubCategory });
        }
        context.dispatch('searchProducts');
    },
    async addToCart(context, id: string) {
        const productToAdd = await this.getters.getProductById();

    },
    removeFilter(context, key: keyof FilterOptions) {
        context.commit(REMOVE_FILTER, key);
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