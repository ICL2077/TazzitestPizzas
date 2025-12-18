import { createSlice } from '@reduxjs/toolkit';

export interface sorting {
    name: string;
    type: string;
    order: string;
}

interface initialStateTypes {
    curSorting: sorting;
    sortIndex: number;
}

export const listOfSorting = [
    { name: 'популярности', type: 'rating', order: 'desc' },
    { name: 'алфавиту', type: 'title', order: 'asc' },
    { name: 'цене', type: 'price', order: 'asc' },
];

export const sortingSlice = createSlice({
    name: 'sorting',

    initialState: {
        curSorting: listOfSorting[0],
        sortIndex: 0,
    } as initialStateTypes,

    reducers: {
        changeSorting: (state, action) => {
            state.curSorting = listOfSorting[action.payload];
        },
        changeSortIndex: (state, action) => {
            state.sortIndex = action.payload;
        },
    },
});

export const selectSortingData = (state: any) => state.sorting;

export const { changeSorting, changeSortIndex } = sortingSlice.actions;
export default sortingSlice.reducer;
