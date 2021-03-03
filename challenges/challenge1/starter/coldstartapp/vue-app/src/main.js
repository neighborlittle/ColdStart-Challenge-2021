import App from '@/app.vue';
import Vue from 'vue';
import Notifications from 'vue-notification';

import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
