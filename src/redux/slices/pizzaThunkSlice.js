import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const pizzaThunk = createAsyncThunk('pizza/fetchData', async (params) => {
    const { curPage, curCategory, curSort, searchValue } = params;

    const url = new URL('https://68da669423ebc87faa2fff70.mockapi.io/pizzas');

    url.searchParams.append('page', curPage);
    url.searchParams.append('limit', 4);
    curCategory && url.searchParams.append('category', curCategory);
    url.searchParams.append('sortBy', curSort.type);
    searchValue && url.searchParams.append('title', searchValue);
    url.searchParams.append('order', curSort.order);

    const { data } = await axios.get(url.toString());
    return data;
});

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
        });
    },
});

export default pizzaSlice.reducer;
