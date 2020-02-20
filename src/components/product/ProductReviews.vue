<template>
  <div class="review-container">
    <div v-for="review in reviews" :key="review.productReviewID" class="review-item">
      <span class="review-text">{{review.comments}}</span>
      <span class="review-info review-rating">Rating {{review.rating}} stars</span>
      <span class="review-info">{{review.reviewerName}}</span>
      <span class="review-info">{{review.reviewDate}}</span>
    </div>
    <p v-if="!reviews || !reviews.length">No reviews yet!</p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProductReview } from "@/store/product/types";

@Component
export default class ProductReviews extends Vue {
  @Prop(Array) private reviews!: Array<ProductReview>;
}
</script>

<style lang="scss" scoped>
.review-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  .review-item {
    background: $main-color;
    margin: $margin/2;
    padding: $padding;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
  }
  .review-text {
    flex-basis: 66%;
    text-align: left;
    line-height: 24px;
  }

  .review-info {
    line-height: 24px;
    font-size: $font-size-normal;
    font-weight: 500;
    text-align: right;
    flex-grow: 2;
    & .review-rating {
      font-weight: 100;
    }
  }
}
</style>
