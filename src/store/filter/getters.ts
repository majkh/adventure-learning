import { GetterTree } from 'vuex';
import { FilterState, FilterOptions } from './types';
import { RootState } from '../types';

export const getters: GetterTree<FilterState, RootState> = {
    getCategoryActive: (state) => (categoryId: string): boolean => {
        if (categoryId === undefined) {
            return !state.currentFilter.Category
        }
        return state.currentFilter.Category === categoryId.toString()
    },
    getSubCategoryActive: (state) => (categoryId: string, subCategoryId: string): boolean => {
        return state.currentFilter.Category === categoryId.toString() && state.currentFilter.SubCategory === subCategoryId.toString()
    },
    getFilterValue: (state) => (property: keyof FilterOptions): any => {
        return state.currentFilter[property] ? state.currentFilter[property] : undefined;
    },
    shouldSearch: state => (): boolean => {
        return Object.values(state.currentFilter).every(filter => (filter !== undefined || filter !== '' || filter !== '-1'))
    }
};