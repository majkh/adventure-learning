<template>
  <v-select
    :placeholder="selectOptions.name"
    class="filter-select"
    :options="selectOptions.values"
    :value="getFilterValue(selectOptions.property)"
    @input="setFilter({Property: selectOptions.property, Value: $event})"
  ></v-select>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);
import { FilterSetOption } from "@/store/filter/types";
import { namespace } from "vuex-class";
const filter = namespace("filters");

@Component
export default class ProductFilterSelect extends Vue {
  @Prop(Object) private selectOptions!: {
    property: string;
    name: string;
    values: Array<string | number>;
  };
  @Emit() setFilter(option: FilterSetOption) {}
  @filter.Getter getFilterValue!: string;
}
</script>

<style lang="scss" scoped >
.filter-select {
  margin-left: 32px;
  min-width: 104px;
}
</style>
