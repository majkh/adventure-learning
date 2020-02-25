<template>
  <div class="menu-container">
    <div class="menu-nav">
      <router-link to="/">Home</router-link>
    </div>
    <span class="menu-cart" @click="$modal.show('cart')">Cart</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NavMenu extends Vue {}
</script>
<style lang="scss" scoped>
.menu-container {
  width: 100%;

  background: $main-color;
  .menu-nav {
    padding: $padding/2;

    a {
      font-weight: bold;
      color: $text-color;
      padding-left: $padding/4;
      padding-right: $padding/4;
      border-left: 1px solid black;
      &:first-child {
        padding-left: 0;
        border: none;
      }

      &.router-link-exact-active {
        color: $text-active;
      }
    }
  }

  .menu-cart {
    width: 40px;
    height: 20px;
    border: 1px dashed black;
    display: block;
    position: absolute;
    top: 20px;
    right: 30px;
  }
}
</style>