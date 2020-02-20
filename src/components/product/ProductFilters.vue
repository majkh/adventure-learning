<template>
  <div class="filter-container">
    <ProductFilterSelect
      :selectOptions="select"
      v-for="select in selectFilters"
      :key="select.property"
    />
    <ProductFilterRange :rangeOptions="range" v-for="range in rangeFilters" :key="range.property" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductFilterSelect from "./ProductFilterSelect.vue";
import ProductFilterRange from "./ProductFilterRange.vue";
import { FilterOptions } from "@/store/filter/types";
@Component({
  components: {
    ProductFilterSelect,
    ProductFilterRange
  }
})
export default class ProductFilters extends Vue {
  get selectFilters(): Array<{
    property: keyof FilterOptions;
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
  get rangeFilters(): Array<{
    property: keyof FilterOptions;
    name: string;
    range: { min: number; max: number; defaultValue: number };
  }> {
    return [
      {
        property: "PriceMin",
        name: "Min Price",
        range: { min: 0, max: 1000, defaultValue: 0 }
      },
      {
        property: "PriceMax",
        name: "Max Price",
        range: { min: 0, max: 1000, defaultValue: 1000 }
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
  align-items: center;
  align-content: stretch;
  margin-top: $margin/2;
}
</style>
