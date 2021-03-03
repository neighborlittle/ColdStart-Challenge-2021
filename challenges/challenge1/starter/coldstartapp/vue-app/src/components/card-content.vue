<script>
import { mapMutations } from 'vuex';
import ADD_TO_CART from '../store/modules/mutation-types';

export default {
  name: 'CardContent',
  props: {
    id: {
      type: Number,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    ...mapMutations('cart', { addToCart: ADD_TO_CART }),
  },
};
</script>
<style scoped>
  .card-content {
    cursor: pointer;
  }

  .card-content:hover {
    transform: scale(1.05);
  }
</style>
<template>
  <div class="card-content" v-on:click="addToCart({id, name})">
    <header class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </header>

    <div class="content">
      <div class="catalog-image">
        <img v-bind:src="imageurl" />
      </div>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>
