<template>
  <div class="category-container">
    <div class="category-menu-list">
      <div
        @mouseover="activeCategory = category"
        v-for="category in productCategories"
        :key="category.Id"
      >
        <div
          @click="setCategory(category.productCategoryID)"
          class="category-menu-item"
        >{{category.name}}</div>
      </div>
    </div>
    <div
      v-if="activeCategory && activeCategory.subCategory.length > 0"
      class="subcategory-menu-list"
    >
      <span
        @click="setCategory(activeCategory.productCategoryID, subcategory.productSubcategoryId)"
        class="subcategory-menu-item"
        v-for="subcategory in activeCategory.subCategory"
        :key="subcategory.productSubcategoryId"
      >{{subcategory.name}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { createNamespacedHelpers } from "vuex";
import { CategorySetOption } from "../../store/product/types";
const { mapState, mapActions } = createNamespacedHelpers("products");

@Component({
  computed: {
    ...mapState(["productCategories"])
  },
  data() {
    return {
      activeCategory: undefined
    };
  },
  created() {
    this.$store.dispatch("products/setAllCategories");
  }
})
export default class CategoryMenu extends Vue {
  setCategory = (category: string, subcategory?: string): void => {
    const categoryOption: CategorySetOption = {
      Category: category,
      SubCategory: subcategory
    };
    this.$store.dispatch("products/setCategory", categoryOption);
  };
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
