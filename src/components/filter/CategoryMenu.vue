<template>
  <div class="category-container">
    <div class="category-menu-list">
      <div
        @mouseover="activeCategory = category"
        v-for="category in getProductCategories"
        :key="category.Id"
      >
        <div @click="setCategory(category.Id)" class="category-menu-item">{{category.Name}}</div>
      </div>
    </div>
    <div
      v-if="activeCategory && activeCategory.SubCategories.length > 0"
      class="subcategory-menu-list"
    >
      <span
        @click="setCategory(activeCategory.Id, subcategory.Id)"
        class="subcategory-menu-item"
        v-for="subcategory in activeCategory.SubCategories"
        :key="subcategory.Id"
      >{{subcategory.Name}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { CategorySetOption, FilterOptions } from "@/models/FilterModel.ts";
import { SET_SELECTED_CATEGORY } from "@/store/mutation-types";
@Component({
  computed: {
    ...mapGetters(["getProductCategories"])
  },
  data() {
    return {
      activeCategory: undefined
    };
  }
})
export default class CategoryMenu extends Vue {
  setCategory(category: string, subcategory?: string): void {
    this.$store.dispatch(
      SET_SELECTED_CATEGORY,
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
.category-menu-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
  padding-bottom: 16px;
  border-bottom: 1px solid lightgray;
  .category-menu-item {
    font-size: 24px;
    padding: 0 16px;
    text-align: left;
    cursor: pointer;
  }
}
.subcategory-menu-list {
  padding-top: 16px;
  margin: 0 auto;
  margin-bottom: 32px;
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}

.subcategory-menu-item {
  flex-basis: 33%;
  font-size: 16px;
  // padding-right: 16px;
  text-align: center;
  cursor: pointer;
}
</style>
