import { createSlice } from '@reduxjs/toolkit';

export const listOfSorting = [
    { name: 'популярности', type: 'rating', order: 'desc' },
    { name: 'алфавиту', type: 'title', order: 'asc' },
    { name: 'цене', type: 'price', order: 'asc' },
];

export const sortingSlice = createSlice({
    name: 'sorting',

    initialState: {
        curSorting: listOfSorting[0],
    },

    reducers: {
        changeSorting: (state, action) => {
            state.curSorting = listOfSorting[action.payload];
        },
    },
});

export const { changeSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
