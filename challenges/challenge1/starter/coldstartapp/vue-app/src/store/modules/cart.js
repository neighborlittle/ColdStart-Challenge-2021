import Vue from 'vue';

import ADD_TO_CART from './mutation-types';


export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    cart: {},
  },
  mutations: {
    [ADD_TO_CART](state, icecream) {
      state.cart = { ...state.cart };
      if (icecream.id in state.cart) {
        state.cart[icecream.id] += 1;
      } else {
        state.cart[icecream.id] = 1;
      }
      Vue.notify({
        group: 'cart',
        title: `${icecream.name} added to cart`,
      });
    },
  },
  getters: {
    cart: (state) => state.cart,
    itemsCount: (state) => Object.keys(state.cart).reduce((sum, key) => sum + state.cart[key], 0),
  },
};
