import Vue from 'vue'
import Vuex from 'vuex'
import Product from '@/models/ProductModel.ts'
import { FilterOptions, FilterSetOption, CategorySetOption } from '@/models/FilterModel'
import { productCategories, mockBikeProducts } from '@/data/mockdata.ts'
import axios from "axios";
import { ADD_ALL_PRODUCTS, SET_FILTER, ADD_TO_CART, REMOVE_FILTER, SET_SELECTED_CATEGORY } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    products: Array<Product>(),
    productCategories: productCategories,
    currentFilter: new FilterOptions(),
    cart: new Array<Object>(),
    count: 0,
    status: "",
    hasLoadedOnce: false
  },
  getters: {
    expensiveProducts: state => {
      return state.products.filter(product => product.Price >= 100)
    },
    getProductById: (state) => (id: string) => {
      return state.products.find(product => product.Id === id) // fetch api if not exists
    },
    getProductCategories: state => {
      return state.productCategories
    },
    getFilter: state => {
      return state.currentFilter
    }
  },
  mutations: {
    [ADD_ALL_PRODUCTS](state, payload: Array<Product>) {
      state.products = payload;
    },
    [SET_FILTER](state, payload: FilterSetOption) {
      console.log("Debug", "Categories", state.currentFilter)
      state.currentFilter[payload.Property] = payload.Value;
    },
    [ADD_TO_CART](state, payload: FilterSetOption) {
      console.log("Debug", "Categories", state.currentFilter)
      state.currentFilter[payload.Property] = payload.Value;
    }
  },
  actions: {
    [ADD_ALL_PRODUCTS](context, products: Array<Product>) {
      context.commit(ADD_ALL_PRODUCTS, products);
    },
    [SET_FILTER](context, payload: FilterSetOption) {
      context.commit(SET_FILTER, payload);
    },
    async [SET_SELECTED_CATEGORY](context, payload: CategorySetOption) {
      await context.dispatch(SET_FILTER, new FilterSetOption('Category', payload.Category));
      if (payload.SubCategory !== undefined) {
        await context.dispatch(SET_FILTER, new FilterSetOption('SubCategory', payload.SubCategory));
      }
      context.dispatch('searchProducts');
    },
    async [ADD_TO_CART](context, id: string) {
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
    }
  },
  modules: {
  }
})
