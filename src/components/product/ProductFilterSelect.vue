<template>
  <v-select
    :placeholder="selectOptions.name"
    class="filter-select"
    v-model="selected"
    :options="selectOptions.values"
    @input="onSelected"
  ></v-select>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);
@Component
export default class ProductFilterSelect extends Vue {
  @Prop() private selectOptions!: {
    property: string;
    name: string;
    values: Array<string | number>;
  };
  private selected: any;
  data() {
    return {
      selected: undefined
    };
  }
  onSelected(event: any) {
    const setOption = {
      Property: this.selectOptions.property,
      Value: this.selected ? this.selected : undefined
    };
    this.$store.dispatch("products/FILTER_SET", setOption);
  }
}
</script>

<style lang="scss" scoped >
.filter-select {
  margin-left: 32px;
  min-width: 104px;
}
</style>
