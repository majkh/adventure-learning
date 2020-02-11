<template>
  <div id="app">
    <Menu />
    <router-view />
  </div>
</template>
<script>
import { AUTH_LOGOUT } from "@/store/types/auth";
import Menu from "@/components/Menu.vue";

export default {
  name: "app",
  components: { Menu },
  created() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT);
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
