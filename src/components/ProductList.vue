<template>
  <div class="main-wrapper">
    <ProductFilters />
    <div class="list-container">
      <ProductListItem
        v-for="product in products"
        :key="product.Id"
        :product="product"
        :detailed="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductListItem from "./product/ProductListItem.vue";
import ProductFilters from "./product/ProductFilters.vue";
import { Product } from "@/store/product/types";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "products"
);

@Component({
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["getShouldFetch"])
  },
  components: {
    ProductListItem,
    ProductFilters
  }
})
export default class ProductList extends Vue {
  public count!: number;
  public products!: Array<object>;
  public expensiveProducts!: Array<object>;
  getShouldFetch!: any;
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: stretch;
  padding-top: $padding;
}
</style>