<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import CardRecommendation from '@/components/card-recommendation.vue';
import CatalogList from './catalog-list.vue';

export default {
  name: 'Catalog',
  data() {
    return {
      errorMessage: undefined,
      message: '',
      routePath: '/catalog',
      title: 'Our Ice Creams',
    };
  },
  components: {
    ListHeader,
    CatalogList,
    CardRecommendation,
  },
  async created() {
    await this.getCatalog();
  },
  computed: {
    ...mapGetters('catalog', { catalog: 'catalog' }),
  },
  methods: {
    ...mapActions('catalog', ['getCatalogAction']),
    async getCatalog() {
      this.errorMessages = undefined;
      try {
        await this.getCatalogAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div class="content-container">
    <CardRecommendation></CardRecommendation>
    <ListHeader :title="title" @refresh="getCatalog" :routePath="routePath">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="catalog">
        <CatalogList
          :icecreams="catalog"
          :errorMessage="errorMessage"
        ></CatalogList>
      </div>
    </div>
  </div>
</template>
