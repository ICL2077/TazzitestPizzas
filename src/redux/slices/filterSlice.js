import { createSlice } from '@reduxjs/toolkit';

export const categories = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];

export const filterSlice = createSlice({
    name: 'filter',

    initialState: {
        curCategory: 0,
    },

    reducers: {
        clickOnCat: (state, action) => {
            state.curCategory = action.payload;
        },
    },
});

export const { clickOnCat } = filterSlice.actions;

export default filterSlice.reducer;
