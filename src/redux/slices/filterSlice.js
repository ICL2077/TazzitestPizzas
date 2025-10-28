import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',

    initialState: {
        categories: ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'],
        curCategory: 0,
    },

    reducers: {
        clickOnCat: (state, action) => {
            state.curCategory = action.payload;
        },
    },
});

console.log(filterSlice.actions);

export const { clickOnCat } = filterSlice.actions;

export default filterSlice.reducer;
