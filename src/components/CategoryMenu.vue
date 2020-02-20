<template >
  <div class="category-container" @mouseleave="toggleSubCategories()">
    <div class="category-menu-list">
      <div
        @mouseenter="activeCategory = category"
        v-for="category in productCategories"
        :key="category.Id"
        @click="setCategory(category.productCategoryID)"
        class="category-menu-item"
        :class="{'item-active': getCategoryActive(category.productCategoryID)}"
      >{{category.name}}</div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="activeCategory && activeCategory.subCategory && activeCategory.subCategory.length > 0"
        class="subcategory-menu-list"
      >
        <span
          v-for="subcategory in activeCategory.subCategory"
          :key="subcategory.productSubcategoryId"
          @click="setCategory(activeCategory.productCategoryID, subcategory.productSubcategoryId)"
          class="subcategory-menu-item"
          :class="{'item-active': getSubCategoryActive(activeCategory.productCategoryID, subcategory.productSubcategoryId)}"
        >{{subcategory.name}}</span>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { createNamespacedHelpers } from "vuex";
import { CategorySetOption } from "@/store/filter/types";
const { mapState, mapGetters } = createNamespacedHelpers("filters");

@Component({
  computed: {
    ...mapState(["productCategories"]),
    ...mapGetters(["getCategoryActive", "getSubCategoryActive"])
  },
  data() {
    return {
      activeCategory: undefined,
      show: false
    };
  },
  created() {
    this.$store.dispatch("filters/CATEGORY_ADD_ALL");
  }
})
export default class CategoryMenu extends Vue {
  private activeCategory?: Object = undefined;
  setCategory = (category: string, subcategory?: string): void => {
    const categoryOption: CategorySetOption = {
      Category: category,
      SubCategory: subcategory
    };
    this.$store.dispatch("filters/CATEGORY_SET_SELECTED", categoryOption);
  };
  toggleSubCategories() {
    if (!this.$store.getters["filters/getIsSubCategoryChoosen"]()) {
      this.activeCategory = undefined;
    }
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  background: $main-color;
  display: block;
  .category-menu-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    padding-bottom: 16px;
    .category-menu-item {
      font-size: $font-size-large;
      padding: 0 16px;
      text-align: left;
      cursor: pointer;
    }
  }
  .subcategory-menu-list {
    padding: 16px 0;
    margin: 0 auto;
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
    font-size: $font-size-normal;
    text-align: center;
    cursor: pointer;
  }

  .item-active {
    color: $text-active;
  }
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-35px);
  opacity: 0.5;
}
</style>