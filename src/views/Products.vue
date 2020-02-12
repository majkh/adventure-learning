<template>
  <div class="products">
    <CategoryMenu />
    <ProductList />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import CategoryMenu from "@/components/filter/CategoryMenu.vue";
export default {
  name: "products",
  components: {
    ProductList,
    CategoryMenu
  }
};
</script>
<style lang="scss" scoped>
.products {
  height: 100%;
}
</style>