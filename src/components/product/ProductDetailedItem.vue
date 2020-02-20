<template>
  <div class="product-container">
    <div class="product-image">
      <img :src="this.product.photo && this.product.photo.largePhoto|decode64Image" />
    </div>
    <div class="product-info-container">
      <div class="product-info-row">
        <span class="product-info-text-name">{{product.name}}</span>
        <span class="product-info-text-number">#{{product.productNumber}}</span>
      </div>
      <span class="product-info-text-price">{{product.listPrice | currency}}</span>
      <span class="product-info-text">Weight: {{product.weight}}</span>
      <span class="product-info-text" v-if="product.size">Size: {{product.size }}</span>
      <span class="product-info-text" v-if="product.color">Color: {{product.color }}</span>
      <span
        v-if="product.review"
      >Rating: {{avgRating}} stars out of {{product.review.length}} reviewers</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "@/store/product/types";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("products");
@Component
export default class ProductDetailedItem extends Vue {
  @Prop(Object) private product!: Product;
  get avgRating(): number {
    return this.product.review
      ? this.product.review.reduce((acc, curr) => {
          return acc + curr.rating;
        }, 0) / this.product.review.length
      : 0;
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  width: 80%;
  margin: 0 auto;
  margin-top: $margin;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
}

.product-image {
  margin-right: $margin;
  flex-basis: 40%;
  img {
    width: 350px;
  }
}

.product-info-container {
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  text-align: left;
  .product-info-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    .product-info-text-number {
      padding-left: $padding;
      margin: auto 0;
    }
  }
  .product-info-text {
    font-size: $font-size-medium;
    line-height: 27px;
  }
  .product-info-text-name {
    font-size: $font-size-large;
    line-height: 48px;
    font-weight: 700;
  }
  .product-info-text-price {
    font-size: $font-size-normal;
    line-height: 32px;
    font-weight: 700;
  }
}
</style>
