<template>
  <v-select
    :placeholder="selectOptions.name"
    class="filter-select"
    :options="selectOptions.values"
    :value="getFilterValue(selectOptions.property)"
    @input="onSelected"
  ></v-select>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("filters");

Vue.component("v-select", vSelect);

@Component({
  computed: {
    ...mapGetters(["getFilterValue"])
  }
})
export default class ProductFilterSelect extends Vue {
  @Prop(Object) private selectOptions!: {
    property: string;
    name: string;
    values: Array<string | number>;
  };
  onSelected(value: any) {
    const setOption = {
      Property: this.selectOptions.property,
      Value: value ? value : undefined
    };
    this.$store.dispatch("filters/FILTER_SET_AND_SEARCH", setOption);
  }
}
</script>

<style lang="scss" scoped >
.filter-select {
  margin-left: 32px;
  min-width: 104px;
}
</style>
