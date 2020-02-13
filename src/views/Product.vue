<template>
  <div class="product">
    <ProductItem v-if="product" :product="product" :detailed="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductItem from "@/components/product/ProductItem.vue";
import { createNamespacedHelpers, mapActions } from "vuex";
const { mapGetters } = createNamespacedHelpers("products");
export default {
  name: "product",
  components: {
    ProductItem
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
      this.$store.dispatch("products/UPDATE_PRODUCT", this.$route.params.id);
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
