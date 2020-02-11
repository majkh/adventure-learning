<template>
  <div class="filter-menu-list">
    <div
      @mouseover="category.Active = true"
      @mouseleave="category.Active = false"
      v-for="category in getProductCategories"
      :key="category.Id"
    >
      <div @click="setCategory(category.Id)" class="filter-menu-category">{{category.Name}}</div>
      <div v-if="category.Active && category.SubCategories.length > 0">
        <span
          @click="setCategory(category.Id, subcategory.Id)"
          class="filter-menu-sub-category"
          v-for="subcategory in category.SubCategories"
          :key="subcategory.Id"
        >{{subcategory.Name}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { CategorySetOption, FilterOptions } from "@/models/FilterModel.ts";
import { SET_CATEGORY } from "@/store/mutation-types";
@Component({
  computed: {
    ...mapGetters(["getProductCategories"])
  }
})
export default class FilterMenu extends Vue {
  setCategory(category: string, subcategory?: string): void {
    this.$store.dispatch(
      SET_CATEGORY,
      new CategorySetOption(category, subcategory)
    );
    //   .then(() => {
    //     this.$router.push({
    //       path: "search",
    //       query: this.$store.getters.getFilter
    //     });
    //   });
  }
}
</script>

<style lang="scss" scoped>
.filter-menu-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  margin-bottom: 32px;
  .filter-menu-category {
    font-size: 24px;
    padding: 0 16px;
    text-align: left;
    cursor: pointer;
  }

  .filter-menu-sub-category {
    font-size: 16px;
    padding-right: 16px;
    text-align: left;
    cursor: pointer;
  }
}
</style>
