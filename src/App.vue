<template>
  <div id="app">
    <NavMenu />
    <CartModal />
    <router-view />
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu.vue";
import CartModal from "@/components/cart/CartModal.vue";
export default {
  name: "app",
  components: { NavMenu, CartModal }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  height: 100%;
}
</style>
