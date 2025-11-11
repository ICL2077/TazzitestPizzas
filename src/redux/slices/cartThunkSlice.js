import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = new URL('https://68da669423ebc87faa2fff70.mockapi.io/cart');

export const cartThunk = createAsyncThunk('cart/fetchData', async (params) => {
    const { data } = await axios.get(url.toString());
    return data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        loading: true,
        totalPrice: 0,
    },
    reducers: {
        setTotalPriceToZero: (state) => {
            state.totalPrice = 0;
        },
        addToTotalPrice: (state, action) => {
            state.totalPrice += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cartThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cartThunk.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.loading = false;
        });
        builder.addCase(cartThunk.rejected, (state) => {
            state.loading = true;
        });
    },
});

export const { addToTotalPrice, removeFromTotalPrice, setTotalPriceToZero } = cartSlice.actions;
export default cartSlice.reducer;
