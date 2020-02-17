<template>
  <div class="product-container">
    <div class="product-image">
      <img :src="this.product.photo.largePhoto|decode64Image" />
    </div>
    <div class="product-info-container">
      <span class="product-info-text-name">{{product.name}}</span>
      <span class="product-info-text-price">{{product.listPrice | currency}}</span>
      <span>Rating: {{avgRating}} of {{product.review.length}} reviewers</span>
      <span class="product-info-text">ProductNumber: {{product.productNumber}}</span>
      <span class="product-info-text">Weight: {{product.weight}}</span>
      <span class="product-info-text" v-if="product.size">Size: {{product.size }}</span>
      <span class="product-info-text" v-if="product.color">Color: {{product.color }}</span>
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
  @Prop() private product!: Product;
  private showReviews = false;
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
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
}

.product-image {
  margin-right: 64px;
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
  .product-info-text {
    font-size: 18px;
    line-height: 27px;
  }
  .product-info-text-name {
    font-size: 24px;
    line-height: 48px;
    font-weight: 700;
  }
  .product-info-text-price {
    font-size: 16px;
    line-height: 32px;
    font-weight: 700;
  }
}
</style>
