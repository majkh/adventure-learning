<template>
  <v-select
    :placeholder="selectOptions.name"
    class="filter-select"
    v-model="selected"
    :options="selectOptions.values"
    @input="onSelected"
  ></v-select>
  <!-- <select @change="onChange" v-model="selected" class="filter-select">
    <option disabled :value="undefined">{{selectOptions.name}}</option>
    <option v-for="option in selectOptions.values" :key="option" :value="option">{{ option }}</option>
  </select>-->
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
    console.log("DEBUG", event, this.selected);
  }
}
</script>

<style lang="scss" >
.filter-select {
  margin-left: 32px;
  min-width: 104px;
}
</style>
