import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: 'pagination',

    initialState: {
        curPage: 1,
    },

    reducers: {
        changePage(state, action) {
            state.curPage = action.payload;
        },
    },
});

export const { changePage } = paginationSlice.actions;
export default paginationSlice.reducer;
