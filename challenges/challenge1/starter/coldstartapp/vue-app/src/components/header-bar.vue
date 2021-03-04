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
    this.clientPrincipal = payload.clientPrincipal;
  },
  data() {
    return {
      providers: ['github', 'twitter', 'facebook', 'aad', 'google'],
      clientPrincipal: null,
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
  .auth-container {
    display: flex;
    flex-direction: row;
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
          <div v-if="!clientPrincipal" class="auth-container">
            <AuthLogin v-for="provider in providers"
              :key="provider"
              :provider="provider" class="navbar-item" />
          </div>
          <router-link v-else class="navbar-item nav-home" to="/.auth/logout">Log out</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
