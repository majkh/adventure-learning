<template>
  <div class="item-container">
    <img :src="this.product.photo.largePhoto|decode64Image" />
    <div class="product-info-row">
      <span class="product-info product-name">
        <router-link
          v-if="!detailed"
          class="product-link"
          :to="{ name: 'product', params: { id: product.productId }}"
        >{{product.name}}</router-link>
        <p v-if="detailed">{{product.name}}</p>
      </span>
      <span class="product-info">{{product.listPrice | currency}}</span>
    </div>
    <span class="product-info-row product-info">ProductNumber: {{product.productNumber}}</span>
    <span class="product-info-row product-info">Weight: {{product.weight}}</span>
    <span class="product-info-row product-info" v-if="product.size">Size: {{product.size }}</span>
    <span class="product-info-row product-info" v-if="product.color">Color: {{product.color }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/store/product/types";
import router from "../../router";
@Component
export default class ProductListItem extends Vue {
  @Prop() private product!: Product;
  @Prop() private detailed!: boolean;
}
</script>

<style lang="scss" scoped>
.item-container {
  flex-basis: 26%;
  padding: $padding/2;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  box-shadow: 2px 5px 2px lightgrey;
  border-radius: 5%;
  align-items: center;
  margin: $margin/2;
  text-align: left;
  font-size: $font-size-medium;
  img {
    margin-bottom: $margin/2;
  }
  .product-info-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: baseline;
    align-content: stretch;
    span:first-child {
      flex-basis: 75%;
    }
    span:nth-child(2) {
      text-align: right;
    }
  }
  .product-info {
    // width: 100%;
    &.product-name {
      font-weight: 500;
      margin-bottom: $margin/4;
      .product-link {
        text-decoration: none;
        color: black;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .product-image {
    width: 150px;
  }
}
</style>
