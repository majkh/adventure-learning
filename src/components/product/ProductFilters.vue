<template>
  <div class="filter-container">
    <ProductFilterSelect :selectOptions="select" v-for="select in filters" :key="select.property" />
    <!-- <select class="filter-select" v-for="filter in filters" :key="filter.property">
      <option v-for="option in filter.values" :key="option" :value="option">{{ option }}</option>
    </select>-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductFilterSelect from "./ProductFilterSelect.vue";
@Component({
  components: {
    ProductFilterSelect
  }
})
export default class ProductFilters extends Vue {
  get filters(): Array<{
    property: string;
    name: string;
    values: Array<string | number>;
  }> {
    return [
      {
        property: "Color",
        name: "Color",
        values: ["Black", "White", "Yellow", "Silver"]
      },
      { property: "Size", name: "Size", values: ["5", "10", "15", "20"] },
      {
        property: "Style",
        name: "Style",
        values: ["Big", "Small", "Fabulous", "Ugly"]
      }
    ];
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: baseline;
  align-content: stretch;
  margin-top: 16px;
}

// .filter-select {
//   margin-left: 32px;
//   font-size: 24px;
//   background: white;
// }
</style>
