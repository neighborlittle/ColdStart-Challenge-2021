<script>
import axios from 'axios';
import ListHeader from '@/components/list-header.vue';
import { mapGetters, mapMutations } from 'vuex';
import API from '../../store/config';
import { CLEAR_CART } from '../../store/modules/mutation-types';


export default {
  name: 'Cart',
  data() {
    return {
      routePath: '/cart',
      title: 'Your Cart',
      address: '',
    };
  },
  components: {
    ListHeader,
  },
  computed: {
    ...mapGetters('cart', { cart: 'cart', itemsCount: 'itemsCount' }),
    ...mapGetters('catalog', { catalog: 'catalog', recommendation: 'recommendation' }),
  },
  methods: {
    ...mapMutations('cart', { clearCart: CLEAR_CART }),
    async preorder() {
      try {
        await axios.post(`${API}/orders`, {
          address: this.address,
          orders: this.cart,
          recommendation: this.recommendation,
        });
        this.clearCart();
        this.$notify({
          group: 'app',
          title: 'Preordered icecreams',
        });
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          this.$notify({
            group: 'app',
            title: 'Please login to preorder',
            type: 'warn',
          });
        } else {
          this.$notify({
            group: 'app',
            title: 'Unexpected error occured',
            type: 'error',
          });
        }
      }
    },
  },
};
</script>
<style scoped>

  .content-container {
    display: flex;
    flex-direction: column;
  }
  img {
    height: 30px;
    margin-right: 4px;
  }

  .cart-item {
    display: flex;
    align-items: center;
    margin: 4px 2px 4px 2px;
  }

  button, button:focus {
    background-color: transparent;
    border: 1px solid #000000;
    border-radius: 28px;
    outline: 0;
  }

  button:active {
    position: relative;
    top: 1px;
  }
</style>

<template>
  <div class="content-container">
    <ListHeader :title="title" :routePath="routePath">
    </ListHeader>
    <div>
      <p>Review your order and once you confirm give us your address
         and we will deliver your icecreams once they are ready!</p>
      <div>
        <input v-model="address" />
        <span v-show="!address" style="color: red">You have to provide address :)</span>
      </div>
      <button v-on:click="preorder" :disabled="!address || itemsCount === 0">Preorder</button>
    </div>
    <div class="cart-item"
        v-for="(key) in Object.keys(cart)"
        :key="key"
        role="presentation"
      >
      <img v-bind:src="catalog.find(i => i.Id == key).ImageUrl" />
      <span>{{ catalog.find(i => i.Id == key).Name }} x {{cart[key]}}</span>
      </div>
  </div>
</template>
