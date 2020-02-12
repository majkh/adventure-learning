<template>
  <div class="item-container">
    <img class="product-image" alt="Vue logo" src="@/assets/logo.png" />
    <span class="product-name">
      <router-link
        v-if="!detailed"
        class="product-link"
        :to="{ name: 'product', params: { id: product.Id }}"
      >{{product.Name}}</router-link>
      <p v-if="detailed">{{product.Name}}</p>
    </span>
    <span class="product-info">Quantity: {{product.Quantity}}</span>
    <span class="product-info">Price: {{product.Price | currency}}</span>
    <ProductItemDescription v-if="detailed" :product="product" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/store/product/types";
import ProductItemDescription from "./ProductItemDescription.vue";
@Component({
  components: {
    ProductItemDescription
  }
})
export default class ProductItem extends Vue {
  @Prop() private product!: Product;
  @Prop() private detailed!: boolean;
}
</script>

<style lang="scss" scoped>
.item-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5%;
  align-items: center;
  margin: 0 16px;
  .product-name {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 8px;
    .product-link {
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .product-info {
    width: 100%;
    text-align: left;
  }
  .product-image {
    width: 150px;
  }
}
</style>
