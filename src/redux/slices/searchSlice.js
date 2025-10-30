import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',

    initialState: {
        searchValue: '',
    },

    reducers: {
        searchIt: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});

export const { searchIt } = searchSlice.actions;
export default searchSlice.reducer;
