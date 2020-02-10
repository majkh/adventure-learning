<template>
  <div class="list-container">
    <ProductListItem v-for="product in products" :key="product.Id" v-bind="product" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters, mapActions } from "vuex";
import ProductListItem from "./product/ProductListItem.vue";
import { mockProducts } from "@/data/mockdata.ts";
import axios from "axios";

@Component({
  computed: {
    ...mapState(["count", "products"]),
    ...mapGetters(["expensiveProducts"]),
    ...mapActions(["addProducts"])
  },
  components: {
    ProductListItem
  }
})
export default class ProductList extends Vue {
  public count!: number;
  public products!: Array<object>;
  public expensiveProducts!: Array<object>;
  //   public addProducts!: (products: Array<Product>) => void;
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => {
        console.log(response);
        this.$store.dispatch("addProducts", mockProducts);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //   get count() {
  //     return this.$store.state.count;
  //   }

  //   get products() {
  //     return this.$store.state.products;
  //   }
}
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
  align-content: stretch;
  height: 100%;
}
ul {
  background-color: black;
  color: white;
}
</style>