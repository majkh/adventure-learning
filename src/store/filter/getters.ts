import { GetterTree } from 'vuex';
import { FilterState, FilterOptions } from './types';
import { RootState } from '../types';
import { SEARCH_PREVIOUS_STRINGS } from './mutation-types';

export const getters: GetterTree<FilterState, RootState> = {
    getCategoryActive: (state) => (categoryId: string): boolean => {
        if (categoryId === undefined) {
            return !state.currentFilter.category
        }
        return state.currentFilter.category === categoryId.toString()
    },
    getSubCategoryActive: (state) => (categoryId: string, subCategoryId: string): boolean => {
        return state.currentFilter.category === categoryId.toString() && state.currentFilter.subCategory === subCategoryId.toString()
    },
    getFilterValue: (state) => (property: keyof FilterOptions): any => {
        return state.currentFilter[property];
    },
    getIsSubCategoryChoosen: (state) => (): boolean => {
        return state.currentFilter.subCategory !== undefined
    },
    [SEARCH_PREVIOUS_STRINGS]: (state) => (value: string) => {
        const searchString = new RegExp("^" + value)
        return state.searches.filter((search) => {
            return searchString.test(search);
        })
    }
};