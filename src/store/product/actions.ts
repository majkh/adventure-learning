import { ActionTree } from 'vuex';
import { ProductState, Product, ProductReviewAddModel, ProductReview } from './types';
import { RootState } from '../types';
import { PRODUCTS_ADD_ALL, SKIP_SET, PRODUCTS_SEARCH, PRODUCTS_SET_SYNCED, PRODUCT_UPDATE, PRODUCT_ADD_TO_CART, PRODUCT_ADD_REVIEW } from './mutation-types';
// import { mockProducts, productCategories } from '@/data/mockdata';
import ApiProduct from '@/services/api'
import moment from 'moment'
import { FilterOptions } from '../filter/types';

let shouldFetch = (value?: number, compare = 3, unit: 'minutes' | 'seconds' | 'hours' | 'days' = 'minutes'): boolean => {
    if (value) {
        let now = moment().subtract(compare, unit).valueOf();
        return value <= now
    }
    return true
}

export const actions: ActionTree<ProductState, RootState> = {
    [PRODUCTS_ADD_ALL]({ commit, state, dispatch }, payload: { skip: number, take: number }) {

        if (shouldFetch(state.synced, 3, 'minutes')) {
            ApiProduct.getProducts(payload.skip, payload.take)
                .then(response => {
                    commit(PRODUCTS_ADD_ALL, response);
                    // commit(PRODUCTS_ADD_ALL, mockProducts);
                    commit(PRODUCTS_SET_SYNCED, moment().valueOf());
                })
                .catch(() => {

                    // commit(PRODUCTS_SET_SYNCED, moment().valueOf());
                    // commit(PRODUCTS_ADD_ALL, mockProducts);
                });
        }


    },
    [PRODUCT_ADD_REVIEW]({ commit, state, dispatch }, payload: ProductReviewAddModel) {
        ApiProduct.addReview(payload)
            .then((response: ProductReview) => {
                commit(PRODUCT_ADD_REVIEW, response);
            })
            .catch(err => {
                commit(PRODUCT_ADD_REVIEW, {
                    productId: 937,
                    productReviewID: 1243,
                    rating: 3,
                    reviewerName: 'majk',
                    reviewDate: new Date(),
                    emailAddress: "majk@test.com",
                    comments: "Test response comment"
                } as ProductReview);
            })
    },
    [SKIP_SET]({ commit }, skip: number) {
        commit(SKIP_SET, skip);
    },
    [PRODUCT_UPDATE]({ commit, state }, id: number) {
        if (!state.products.find(product => {
            return product.productId === id && shouldFetch(product.updated, 1, 'hours')
        })) {
            ApiProduct.getSingleProduct(id)
                .then((response: Product) => {
                    response.updated = moment().valueOf()
                    commit(PRODUCT_UPDATE, { id: id, product: response })
                });
        }

    },
    [PRODUCTS_SEARCH]({ commit, dispatch, state }, payload: FilterOptions) {
        if (Object.values(payload).every(el => el === undefined)) {
            return dispatch(PRODUCTS_ADD_ALL, { skip: 0, take: 50 })
        }
        ApiProduct.searchProducts(payload)
            .then(response => {
                commit(PRODUCTS_ADD_ALL, response);
                // commit(PRODUCTS_ADD_ALL, mockProducts);
                commit(PRODUCTS_SET_SYNCED, -1);
            })
            .catch(() => {
                // commit(PRODUCTS_ADD_ALL, mockProducts);
                // commit(PRODUCTS_SET_SYNCED, -1);
            });
    },
    addToCart({ commit, getters }, id: number) {

        const product = getters.getProductById(id);
        commit(PRODUCT_ADD_TO_CART, product)
    }
};