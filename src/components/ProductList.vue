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
// import { mapState, mapGetters, mapActions } from "vuex";
import ProductItem from "./product/ProductItem.vue";
import { Product } from "@/store/product/types";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("products");

@Component({
  computed: {
    ...mapState(["count", "products"]),
    ...mapActions(["addProducts"])
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
    this.$store.dispatch("products/PRODUCTS_ADD_ALL", { skip: 0, take: 50 });
    this.$http
      .get("product")
      .then(response => {
        // this.$store.dispatch("addProducts", mockProducts);
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
  align-items: baseline;
  align-content: stretch;
  height: 100%;
  padding-top: 32px;
}
ul {
  background-color: black;
  color: white;
}
</style>