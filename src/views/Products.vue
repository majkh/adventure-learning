<template>
  <div class="products">
    <CategoryMenu />
    <ProductList />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import CategoryMenu from "@/components/CategoryMenu.vue";
export default {
  name: "products",
  components: {
    ProductList,
    CategoryMenu
  },
  created() {
    this.$store.dispatch("products/PRODUCTS_ADD_ALL", { skip: 0, take: 50 });
  }
  // watch: {
  //   $route(to, from) {
  //     this.$store.dispatch("products/PRODUCTS_ADD_ALL", { skip: 0, take: 50 });
  //   }
  // },
  // methods: {
  //   fetchData() {
  //     this.$store.dispatch("products/PRODUCT_UPDATE", this.$route.params.id);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.products {
  height: 100%;
}
</style>