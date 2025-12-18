import { createSlice } from '@reduxjs/toolkit';
import { pizzaThunk } from '../asyncThunks/pizzaThunk';

export interface Pizza {
    id: number;
    title: string;
    category: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    price: number;
}

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

export const selectPizzaData = (state: any) => state.pizza;

export const selectPizza = (id: number) => (state: any) =>
    state.pizza.pizzas.find((obj: Pizza) => Number(obj.id) === Number(id));

export default pizzaSlice.reducer;
