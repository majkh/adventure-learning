<template>
  <div class="item-container" @click="viewProduct">
    <img class="product-image" alt="Vue logo" src="@/assets/logo.png" />
    <span class="product-name">{{Name}}</span>
    <span class="product-info">Quantity: {{Quantity}}</span>
    <span class="product-info">Price: {{Price | currency}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class ProductListItem extends Vue {
  @Prop() private Id!: string;
  @Prop() private Name!: string;
  @Prop() private Quantity!: number;
  @Prop() private Price!: number;
  viewProduct(): void {
    this.$router.push({ name: "product", params: { id: this.Id } });
  }
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
