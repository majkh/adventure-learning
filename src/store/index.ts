import Vue from 'vue'
import Vuex from 'vuex'
import { ADD_ALL_PRODUCTS, SET_FILTER, REMOVE_FILTER } from './mutation-types'
import Product from '@/models/ProductModel.ts'
import { FilterOptions, IFilterOptions, FilterSetOption, CategorySetOption } from '@/models/FilterModel'
import { productCategories, mockBikeProducts } from '@/data/mockdata.ts'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    products: Array<Product>(),
    productCategories: productCategories,
    currentFilter: new FilterOptions(),
    cart: new Array<Object>(),
    count: 0
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
  },
  actions: {
    addProducts(context, products: Array<Product>) {
      context.commit(ADD_ALL_PRODUCTS, products);
    },
    setFilter(context, payload: FilterSetOption) {
      context.commit(SET_FILTER, payload);
    },
    async setCategory(context, payload: CategorySetOption) {
      await context.dispatch('setFilter', new FilterSetOption('Category', payload.Category));
      if (payload.SubCategory !== undefined) {
        await context.dispatch('setFilter', new FilterSetOption('SubCategory', payload.SubCategory));
      }
      context.dispatch('searchProducts');

    },
    removeFilter(context, key: keyof FilterOptions) {
      context.commit(REMOVE_FILTER, key);
    },
    searchProducts(context) {
      axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(response => {
          console.log(response);
          context.dispatch("addProducts", mockBikeProducts);
        })
        .catch(error => {
          console.log(error);
        });
    }

    // async actionA ({ commit }) {
    //   commit('gotData', await getData())
    // },


  },
  modules: {
  }
})
