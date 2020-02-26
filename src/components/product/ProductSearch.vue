<template>
  <div class="search-container">
    <input
      class="search-input"
      :placeholder="placeholder"
      type="text"
      v-model="currentInput"
      @focus="open=true"
      @blur="open=false"
      @keydown.enter="enter"
      @keydown.down="down"
      @keydown.up="up"
      @input="change"
    />
    <ul class="search-suggestions" v-show="open && matches.length > 0">
      <li
        class="search-suggestions-item"
        :class="{'active': isActive(index)}"
        v-for="(match, index) in matches"
        :key="index"
        @mousedown="selectByClick(index)"
      >{{match}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Getter, State } from "vuex-class";

const namespace: string = "filters";
@Component
export default class ProductFilterSelect extends Vue {
  @Prop(String) placeholder!: string;
  @Prop({ type: Array, required: true }) suggestions!: Array<string>;
  @Prop({ type: String, required: true }) searchInput!: string;
  @Emit() setSearch(input: string) {}
  currentInput: string = this.searchInput;
  current: number = -1;
  open: boolean = false;
  get matches() {
    const searchString = new RegExp("^" + this.currentInput);
    return this.suggestions.filter(search => {
      return searchString.test(search);
    });
  }

  enter() {
    if (this.current >= 0) {
      this.currentInput = this.matches[this.current];
      this.current = -1;
      this.open = false;
    } else {
      this.setSearch(this.currentInput);
    }
  }

  up() {
    if (this.current >= 0) this.current--;
  }

  down() {
    if (this.current < this.matches.length - 1) this.current++;
  }

  isActive(index: number) {
    return index === this.current;
  }

  change() {
    if (this.open == false) {
      this.open = true;
      this.current = 0;
    }
  }
  selectByClick(index: number) {
    this.current = index;
    this.enter();
  }
}
</script>

<style lang="scss" scoped >
.search-suggestions {
  z-index: 99999;
  position: absolute;
  width: 100%;
  height: auto;
  max-height: 500px;
  overflow-y: scroll;
  margin: 0;
  padding: 0;
  padding-top: $padding-input;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  border-top: 0;
  .search-suggestions-item {
    list-style: none;
    margin: 0;
    padding: $padding-input;
    text-align: left;
    background: white;
    &.active {
      background: $main-color;
      color: $text-active;
    }
  }
}
.search-container {
  height: 100%;
  position: relative;
  flex-basis: 33%;
  .search-input {
    height: 100%;
    width: 100%;
    font-size: $font-size-normal;
    padding: $padding-input;
    color: $text-color;
    border-radius: $border-radius;
    border: 1px solid $border-color;
  }
}
</style>
