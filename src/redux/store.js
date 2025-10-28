import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice';

export default configureStore({
    reducer: {
        filter: filterReducer,
        search: searchReducer,
    },
});
