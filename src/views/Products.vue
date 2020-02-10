<template>
  <div class="products">
    <FilterMenu />
    <ProductList />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import FilterMenu from "@/components/filter/FilterMenu.vue";
export default {
  name: "products",
  components: {
    ProductList,
    FilterMenu
  }
};
</script>
<style lang="scss" scoped>
.products {
  height: 100%;
}
</style>