import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',

    initialState: {
        searchValue: '',
        searchValueInpt: '',
    },

    reducers: {
        searchIt: (state, action) => {
            state.searchValue = action.payload;
        },
        searchItInpt: (state, action) => {
            state.searchValueInpt = action.payload;
        },
    },
});

export const { searchIt, searchItInpt } = searchSlice.actions;
export default searchSlice.reducer;
