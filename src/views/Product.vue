<template>
  <div class="product">
    <ProductListItem v-bind="product" />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductListItem from "@/components/product/ProductListItem.vue";

export default {
  name: "product",
  components: {
    ProductListItem
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
