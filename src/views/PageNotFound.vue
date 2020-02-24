<template>
  <h1>{{message}}</h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PageNotFound extends Vue {
  public message: string = "Oooops, this page does not exist!";
}
</script>

<style lang="scss" scoped>
</style>