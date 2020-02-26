<template>
  <modal name="cart" :width="800" :minHeight="300" height="auto" :scrollable="true">
    <div class="modal-container" v-if="cart.length>0">
      <div class="cart-item" v-for="(cartItem, index) in cart" :key="index">
        <span class="cart-item-name">{{cartItem.name}}</span>
      </div>
    </div>
  </modal>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Product } from "@/store/product/types";
const productStore = namespace("products");
@Component
export default class CartModal extends Vue {
  @productStore.State
  private cart!: Array<Product>;
}
</script>

<style lang="scss" scoped >
.modal-container {
  padding: $padding;
}
</style>
