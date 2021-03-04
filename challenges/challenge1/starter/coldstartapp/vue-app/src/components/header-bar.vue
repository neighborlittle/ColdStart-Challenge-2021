<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogin from '@/components/auth-login.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
  },
  async created() {
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;
    console.log(clientPrincipal);
  },
  data() {
    return {
      providers: ['github', 'twitter', 'facebook', 'aad', 'google'],
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters('cart', ['itemsCount']),
  },
};
</script>

<style scoped>
  .cart-items {
    margin-left: 4px;
    background: #33C5F3;
    color: white;
    min-width: 20px;
    max-height: 16px;
    text-align: center;
    border-radius: 30%;
    font-size: 10px;
  }
</style>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
          <router-link class="navbar-item nav-home" to="/cart">Cart
            <span class="cart-items">{{itemsCount}}</span>
          </router-link>
          <AuthLogin v-for="provider in providers"
            :key="provider"
            :provider="provider" class="navbar-item" />
        </div>
      </div>
    </nav>
  </header>
</template>
