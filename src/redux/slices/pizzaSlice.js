import { createSlice } from '@reduxjs/toolkit';
import { pizzaThunk } from '../asyncThunks/pizzaThunk';

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        pizzas: [],
        loading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(pizzaThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(pizzaThunk.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.loading = false;
        });
        builder.addCase(pizzaThunk.rejected, (state) => {
            state.loading = false;
            state.pizzas = [];
        });
    },
});

export const selectPizzaData = (state) => state.pizza;

export const selectPizza = (id) => (state) =>
    state.pizza.pizzas.find((obj) => Number(obj.id) === Number(id));

export default pizzaSlice.reducer;
