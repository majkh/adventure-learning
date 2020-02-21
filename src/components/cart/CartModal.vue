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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "products"
);
@Component({
  computed: {
    ...mapState(["cart"])
  }
})
export default class CartModal extends Vue {}
</script>

<style lang="scss" scoped >
.modal-container {
  padding: $padding;
}
</style>
