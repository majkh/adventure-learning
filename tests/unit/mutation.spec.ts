
import { mutations } from '@/store/filter/mutations'
import { FilterState, FilterOptions, FilterSetOption } from '@/store/filter/types'

// destructure assign `mutations`
const { FILTER_SET } = mutations

describe('filter-mutations', () => {

    it('FILTER_SET', () => {
        const state: FilterState = {
            productCategories: undefined,
            currentFilter: new FilterOptions(),
            searches: new Array<string>(),
            synced: -1
        }

        let option: FilterSetOption = {
            Property: "category",
            Value: "1"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter.category).toEqual("1")

        option = {
            Property: "subCategory",
            Value: "2"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter.subCategory).toEqual("2")

        option = {
            Property: "maxPrice",
            Value: "3"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter.maxPrice).toEqual("3")


        option = {
            Property: "minPrice",
            Value: "3"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter).toEqual({
            category: "1",
            subCategory: "2",
            maxPrice: "3",
            minPrice: "3",
            color: undefined,
            size: undefined,
            style: undefined

        } as FilterOptions)

        option = {
            Property: "minPrice",
            Value: undefined
        }
        FILTER_SET(state, option)
        expect(state.currentFilter).toEqual({
            category: "1",
            subCategory: "2",
            maxPrice: "3",
            minPrice: undefined,
            color: undefined,
            size: undefined,
            style: undefined
        })
    })
})