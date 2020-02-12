import { ActionTree } from 'vuex';
import axios from 'axios';
import { ProductState, Product, FilterSetOption, CategorySetOption, FilterOptions } from './types';
import { RootState } from '../types';
import { ADD_ALL_PRODUCTS, SET_FILTER, REMOVE_FILTER, SET_SELECTED_CATEGORY } from './mutation-types';
import { mockBikeProducts } from '@/data/mockdata';


export const actions: ActionTree<ProductState, RootState> = {
    [ADD_ALL_PRODUCTS](context, products: Array<Product>) {
        context.commit(ADD_ALL_PRODUCTS, products);
    },
    [SET_FILTER](context, payload: FilterSetOption) {
        context.commit(SET_FILTER, payload);
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
        axios
            .get("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then(response => {
                console.log(response);
                context.dispatch(ADD_ALL_PRODUCTS, mockBikeProducts);
            })
            .catch(error => {
                console.log(error);
            });
    },
};