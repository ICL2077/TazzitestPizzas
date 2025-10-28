import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice';
import sortingReducer from './slices/sortingSlice';

export default configureStore({
    reducer: {
        filter: filterReducer,
        search: searchReducer,
        sorting: sortingReducer,
    },
});
