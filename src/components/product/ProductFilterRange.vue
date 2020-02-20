<template>
  <div class="filter-range-container">
    <span>{{rangeOptions.name}}</span>
    <input
      type="range"
      class="filter-select"
      :value="getFilterValue(rangeOptions.property) || rangeOptions.range.defaultValue"
      v-bind:min="rangeOptions.range.min"
      v-bind:max="rangeOptions.range.max"
      @mouseup="onSelected"
    />

    <span>{{getFilterValue(rangeOptions.property) || rangeOptions.range.defaultValue}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("filters");

@Component({
  computed: {
    ...mapGetters(["getFilterValue"])
  }
})
export default class ProductFilterRange extends Vue {
  @Prop(Object) private rangeOptions!: {
    property: string;
    name: string;
    range: { min: number; max: number; defaultValue: number };
  };
  onSelected(event: any): void {
    const value = event.target.value;
    const setOption = {
      Property: this.rangeOptions.property,
      Value:
        value === this.rangeOptions.range.min ||
        value === this.rangeOptions.range.max
          ? undefined
          : value
    };
    this.$store.dispatch("filters/FILTER_SET_AND_SEARCH", setOption);
  }
}
</script>

<style lang="scss" scoped>
.filter-range-container {
  margin-left: 32px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
}
</style>
