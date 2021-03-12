import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import cartModule from './modules/cart';
import catalogModule from './modules/catalog';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    catalog: catalogModule,
    cart: cartModule,
  },
  plugins: [createPersistedState()],
  state: {
  },
});
