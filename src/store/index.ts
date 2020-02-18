import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { productModule } from './product/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    version: '1.0.0'
  },
  modules: {
    products: productModule
  }
};

export default new Vuex.Store<RootState>(store);
