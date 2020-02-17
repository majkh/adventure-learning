<template>
  <div class="product-wrapper">
    <ProductDetailedItem v-if="product" :product="product" />
    <ProductReviews v-if="product && product.review" :reviews="product.review" />
  </div>
</template>

<script>
import ProductDetailedItem from "@/components/product/ProductDetailedItem.vue";
import ProductReviews from "@/components/product/ProductReviews.vue";
import { createNamespacedHelpers, mapActions } from "vuex";
const { mapGetters } = createNamespacedHelpers("products");
export default {
  name: "product",
  components: {
    ProductDetailedItem,
    ProductReviews
  },
  data() {
    return {
      id: undefined
    };
  },
  computed: {
    ...mapGetters(["getProductById"]),
    product() {
      return this.getProductById(parseInt(this.$route.params.id));
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.$store.dispatch("products/PRODUCT_UPDATE", this.$route.params.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.product-wrapper {
  div {
    margin-bottom: $margin;
  }
}
</style>
