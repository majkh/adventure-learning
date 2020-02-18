<template>
  <div class="filter-range-container">
    <span>{{rangeOptions.name}}</span>
    <input
      type="range"
      class="filter-select"
      v-model.number="selected"
      v-bind:min="rangeOptions.range.min"
      v-bind:max="rangeOptions.range.max"
      @mouseup="onSelected"
    />

    <span>{{selected}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class ProductFilterRange extends Vue {
  @Prop() private rangeOptions!: {
    property: string;
    name: string;
    range: { min: number; max: number; defaultValue: number };
  };
  private selected!: number;
  data() {
    return {
      selected: this.rangeOptions.range.defaultValue
    };
  }
  onSelected(event: any) {
    console.log(typeof this.selected);

    const setOption = {
      Property: this.rangeOptions.property,
      Value: this.selected
    };
    this.$store.dispatch("products/FILTER_SET", setOption);
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
