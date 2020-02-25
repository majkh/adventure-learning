<template>
  <div class="filter-range-container">
    <span>{{rangeOptions.name}}</span>
    <input
      type="range"
      class="filter-select"
      :value="getFilterValue(rangeOptions.property) || rangeOptions.range.defaultValue"
      v-bind:min="rangeOptions.range.min"
      v-bind:max="rangeOptions.range.max"
      @mouseup="$emit('set-filter', {Property: rangeOptions.property, Value:  $event.target.value === rangeOptions.range.min ||
        $event === rangeOptions.range.max
          ? undefined
          : $event.target.value})"
    />

    <span>{{getFilterValue(rangeOptions.property) || rangeOptions.range.defaultValue}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { createNamespacedHelpers } from "vuex";
import { namespace } from "vuex-class";
const filter = namespace("filters");

@Component
export default class ProductFilterRange extends Vue {
  @Prop(Object) private rangeOptions!: {
    property: string;
    name: string;
    range: { min: number; max: number; defaultValue: number };
  };
  @filter.Getter getFilterValue!: string;
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
