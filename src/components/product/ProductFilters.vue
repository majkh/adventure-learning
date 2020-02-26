<template>
  <div class="filter-container">
    <div class="filter-container-row">
      <ProductSearch
        :placeholder="'Search Product'"
        :searchInput="''"
        :suggestions="searches"
        @set-search="onSetSearch($event)"
      />
      <button class="filters-clear">Clear filters</button>
    </div>
    <div class="filter-container-row">
      <ProductFilterSelect
        :selectOptions="select"
        v-for="select in selectFilters"
        :key="select.property"
        @set-filter="FILTER_SET_AND_SEARCH($event)"
      />
      <ProductFilterRange
        :rangeOptions="range"
        v-for="range in rangeFilters"
        :key="range.property"
        @set-filter="FILTER_SET_AND_SEARCH($event)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductFilterSelect from "./ProductFilterSelect.vue";
import ProductFilterRange from "./ProductFilterRange.vue";
import ProductSearch from "./ProductSearch.vue";
import { FilterOptions, FilterSetOption } from "@/store/filter/types";
import { namespace } from "vuex-class";
const filterStore = namespace("filters");
import {
  FILTER_SET_AND_SEARCH,
  SEARCH_ADD
} from "@/store/filter/mutation-types";
@Component({
  components: {
    ProductFilterSelect,
    ProductFilterRange,
    ProductSearch
  }
})
export default class ProductFilters extends Vue {
  @filterStore.State searches!: Array<string>;
  @filterStore.Action FILTER_SET_AND_SEARCH!: any;
  @filterStore.Action SEARCH_ADD!: any;
  get selectFilters(): Array<{
    property: keyof FilterOptions;
    name: string;
    values: Array<string | number>;
  }> {
    return [
      {
        property: "color",
        name: "Color",
        values: ["Black", "White", "Yellow", "Silver"]
      },
      { property: "size", name: "Size", values: ["S", "M", "L"] },
      {
        property: "style",
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
        property: "minPrice",
        name: "Min Price",
        range: { min: 0, max: 1000, defaultValue: 0 }
      },
      {
        property: "maxPrice",
        name: "Max Price",
        range: { min: 0, max: 1000, defaultValue: 1000 }
      }
    ];
  }
  onSetSearch(value: string) {
    const setOption: FilterSetOption = { Property: "name", Value: value };
    this.$store;
    this[FILTER_SET_AND_SEARCH](setOption).then(() => {
      this[SEARCH_ADD](setOption.Value);
    });
  }
}
</script>

<style lang="scss" scoped>
.filter-container-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  margin-top: $margin/2;
}

.filters-clear {
  margin-left: $margin;
  // font-size: $font-size-small;
  line-height: $font-size-medium;
  background: white;
  border-image: none;
  border-radius: $border-radius;
}
</style>
