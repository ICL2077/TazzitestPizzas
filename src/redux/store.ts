import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice.js';
import searchReducer from './slices/searchSlice.js';
import sortingReducer from './slices/sortingSlice.js';
import paginationReducer from './slices/paginationSlice.js';
import pizzaReducer from './slices/pizzaSlice.js';
import cartReducer from './slices/cartSlice.js';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        search: searchReducer,
        sorting: sortingReducer,
        pagination: paginationReducer,
        pizza: pizzaReducer,
        cart: cartReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
