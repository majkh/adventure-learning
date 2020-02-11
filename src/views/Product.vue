<template>
  <div class="product">
    <ProductItem :product="product" :detailed="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductItem from "@/components/product/ProductItem.vue";
export default {
  name: "product",
  components: {
    ProductItem
  },
  data() {
    return {
      loading: false,
      product: null,
      error: null
    };
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
      this.product = this.$store.getters.getProductById(this.$route.params.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.product {
  display: flex;
  justify-content: space-around;
}
</style>
