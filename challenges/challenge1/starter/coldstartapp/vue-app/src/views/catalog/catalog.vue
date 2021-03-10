<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import ListHeader from '@/components/list-header.vue';
import CatalogList from './catalog-list.vue';
import CardContent from '../../components/card-content.vue';

export default {
  name: 'Catalog',
  data() {
    return {
      errorMessage: '',
      message: '',
      recommendation: null,
      routePath: '/catalog',
      title: 'Our Ice Creams',
    };
  },
  components: {
    ListHeader,
    CatalogList,
    CardContent,
  },
  async created() {
    await this.getCatalog();
    await this.getRecommendation();
  },
  computed: {
    ...mapGetters('catalog', { catalog: 'catalog' }),
  },
  methods: {
    ...mapActions('catalog', ['getCatalogAction']),
    async getCatalog() {
      this.errorMessage = undefined;
      try {
        await this.getCatalogAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
    async getRecommendation() {
      const recommendationId = (await axios.get('/api/recommendation')).data;
      [this.recommendation] = this.catalog.filter((c) => c.Id === recommendationId);
      console.log(this.recommendation);
    },
  },
};
</script>

<template>
  <div class="content-container">
    <ListHeader :title="title" @refresh="getCatalog" :routePath="routePath">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="catalog">
        <div v-if="recommendation" >
          <div class="container"><h3>You may want to try out this flavour:</h3></div>
          <div class="container">
            <CardContent
              :id="recommendation.Id"
              :name="recommendation.Name"
              :description="recommendation.Description"
              :imageurl="recommendation.ImageUrl"
            />
          </div>
        </div>
        <CatalogList
          :icecreams="catalog"
          :errorMessage="errorMessage"
        ></CatalogList>
      </div>
    </div>
  </div>
</template>
