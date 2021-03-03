import PageNotFound from '@/components/page-not-found.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/catalog',
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import(/* webpackChunkName: "catalog" */ './views/catalog/catalog.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "catalog" */ './views/cart/cart.vue'),
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
