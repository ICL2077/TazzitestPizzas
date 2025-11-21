import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice';
import sortingReducer from './slices/sortingSlice';
import paginationReducer from './slices/paginationSlice';
import pizzaReducer from './slices/pizzaSlice.js';
import cartReducer from './slices/cartSlice.js';

export default configureStore({
    reducer: {
        filter: filterReducer,
        search: searchReducer,
        sorting: sortingReducer,
        pagination: paginationReducer,
        pizza: pizzaReducer,
        cart: cartReducer,
    },
});
