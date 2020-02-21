
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
            Property: "Category",
            Value: "1"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter.Category).toEqual("1")

        option = {
            Property: "SubCategory",
            Value: "2"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter.SubCategory).toEqual("2")

        option = {
            Property: "PriceMax",
            Value: "3"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter.PriceMax).toEqual("3")


        option = {
            Property: "PriceMin",
            Value: "3"
        }
        FILTER_SET(state, option)
        expect(state.currentFilter).toEqual({
            Category: "1",
            SubCategory: "2",
            PriceMax: "3",
            PriceMin: "3",
            Color: undefined,
            Size: undefined,
            Style: undefined

        })

        option = {
            Property: "PriceMin",
            Value: undefined
        }
        FILTER_SET(state, option)
        expect(state.currentFilter).toEqual({
            Category: "1",
            SubCategory: "2",
            PriceMax: "3",
            PriceMin: undefined,
            Color: undefined,
            Size: undefined,
            Style: undefined
        })
    })
})