<template>
  <modal name="review" :width="400" :minHeight="300" height="auto" :scrollable="true">
    <div class="modal-review">
      <h1 class="modal-review-heading">Add review</h1>

      <form class="review-form" @submit.prevent>
        <v-select
          required
          :options="[0,1,2,3,4,5]"
          :class="{'input-error': !$v.rating.required}"
          name="rating"
          v-model="rating"
          placeholder="Rating"
        ></v-select>
        <div class="error-tooltip" v-if="!$v.rating.required">Rating is required</div>
        <input
          required
          placeholder="Name"
          type="text"
          :class="{'input-error': !$v.name.required }"
          v-model="name"
        />
        <div class="error-tooltip" v-if="!$v.name.required">Name is required</div>
        <input
          required
          placeholder="Email"
          type="text"
          :class="{'input-error': !$v.email.required || !$v.email.email}"
          v-model="email"
        />
        <div class="error-tooltip" v-if="!$v.email.required">Email is required</div>
        <!-- <div class="error" v-if="!$v.positiveNumber.positive">Value must be a positive number</div> -->
        <div class="error-tooltip" v-if="!$v.email.email">Not a valid email</div>
        <textarea class="review-comment-textarea" rows="4" maxlength="500" placeholder="Comment"></textarea>
        <button @click="addReview()">Add review</button>
      </form>
    </div>
  </modal>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";
import { Action, namespace } from "vuex-class";
import { ProductReviewAddModel } from "@/store/product/types";
import { PRODUCT_ADD_REVIEW } from "@/store/product/mutation-types";
const filter = namespace("products");
@Component
export default class ProductReviewAdd extends Vue {
  @Prop({ required: true, type: Number }) productId!: number;
  @filter.Action
  public [PRODUCT_ADD_REVIEW]!: (addModel: ProductReviewAddModel) => void;
  @Validate({ required })
  private rating: number | null = null;

  @Validate({ required, email })
  private email: string = "";
  @Validate({ required })
  private name: string = "";
  private comment: string = "";

  addReview() {
    let addModel = {
      productId: this.productId,
      reviewerName: this.name,
      emailAddress: this.email,
      rating: this.rating,
      comment: this.comment
    } as ProductReviewAddModel;
    this[PRODUCT_ADD_REVIEW](addModel);
  }
}
</script>

<style lang="scss" scoped>
.modal-review {
  padding: $padding;
  .modal-review-heading {
    margin: 0;
  }
}
.review-form {
  margin: $margin/2 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  * {
    margin-top: $padding/2;
  }
  // .input-error {
  //   border: 1px solid red;
  // }
  .error-tooltip {
    margin-top: $padding/4;
    font-size: $font-size-small;
    color: red;
  }

  .review-comment-textarea {
    resize: none;
  }
}
</style>
