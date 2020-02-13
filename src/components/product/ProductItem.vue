<template>
  <div class="item-container">
    <img :src="productImage" />
    <span class="product-name">
      <router-link
        v-if="!detailed"
        class="product-link"
        :to="{ name: 'product', params: { id: product.productId }}"
      >{{product.name}}</router-link>
      <p v-if="detailed">{{product.name}}</p>
    </span>
    <span class="product-info">ProductNumber: {{product.productNumber}}</span>
    <span class="product-info">Price: {{product.listPrice | currency}}</span>
    <span class="product-info">Weight: {{product.weight}}</span>
    <span class="product-info" v-if="product.size">Size: {{product.size }}</span>
    <span class="product-info" v-if="product.color">Color: {{product.color }}</span>
    <ProductItemDescription v-if="detailed" :product="product" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/store/product/types";
import ProductItemDescription from "./ProductItemDescription.vue";
import router from "../../router";
@Component({
  components: {
    ProductItemDescription
  }
})
export default class ProductItem extends Vue {
  @Prop() private product!: Product;
  @Prop() private detailed!: boolean;
  get productImage(): string {
    if (this.product.photo && this.product.photo.largePhoto) {
      return "data:image/jpeg;base64," + this.product.photo.largePhoto;
    } else {
      return "";
    }
  }
}
</script>

<style lang="scss" scoped>
.item-container {
  flex-basis: 26%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5%;
  align-items: center;
  margin: 16px;
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
