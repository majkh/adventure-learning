<template>
  <div class="menu-container">
    <div class="menu-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/secret">About</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/products">Products</router-link>
    </div>
    <span class="menu-cart">Cart</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default class NavMenu extends Vue {}
</script>
<style lang="scss" scoped>
.menu-container {
  width: 100%;

  .menu-nav {
    padding: 20px;

    a {
      font-weight: bold;
      color: #2c3e50;
      padding-left: 8px;
      padding-right: 8px;
      border-left: 1px solid black;
      &:first-child {
        padding-left: 0;
        border: none;
      }

      &.router-link-exact-active {
        color: #42b983;
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