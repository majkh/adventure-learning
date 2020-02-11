<template>
  <div>
    <span class="product-info">Description: {{product.Description}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Product from "@/models/ProductModel";
@Component
export default class ProductItemDescription extends Vue {
  @Prop() private product!: Product;
}
</script>

<style lang="scss" scoped>
.product-info {
  width: 100%;
  text-align: left;
}
</style>
