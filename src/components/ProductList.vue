<template>
  <div class="list-container">
    <ProductItem
      v-for="product in products"
      :key="product.Id"
      :product="product"
      :detailed="false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters, mapActions } from "vuex";
import { ADD_ALL_PRODUCTS } from "@/store/mutation-types";
import ProductItem from "./product/ProductItem.vue";
import { mockProducts } from "@/data/mockdata.ts";

@Component({
  computed: {
    ...mapState(["count", "products"]),
    ...mapGetters(["expensiveProducts"])
  },
  components: {
    ProductItem
  }
})
export default class ProductList extends Vue {
  public count!: number;
  public products!: Array<object>;
  public expensiveProducts!: Array<object>;
  //   public addProducts!: (products: Array<Product>) => void;
  mounted() {
    this.$http
      .get("v1/bpi/currentprice.json")
      .then(response => {
        console.log(response);
        this.$store.dispatch(ADD_ALL_PRODUCTS, mockProducts);
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
  justify-content: space-around;
  align-items: flex-start;
  align-content: stretch;
  height: 100%;
}
ul {
  background-color: black;
  color: white;
}
</style>