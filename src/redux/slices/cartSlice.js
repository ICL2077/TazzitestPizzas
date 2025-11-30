import { createSlice } from '@reduxjs/toolkit';
import { cartThunk } from '../asyncThunks/cartThunk';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        loading: true,
        totalPrice: 0,
        totalItems: 0,
    },
    reducers: {
        calcPriceAndItems: (state) => {
            state.totalPrice = state.cart.reduce(
                (globalPrice, curItem) => globalPrice + curItem.price * curItem.amount,
                0,
            );

            state.totalItems = state.cart.reduce(
                (allItems, curItem) => allItems + curItem.amount,
                0,
            );
        },
        clearCart: (state) => {
            state.cart = [];
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

export const selectCart = (state) => state.cart;

// селектор для нахождения идентичного товара в корзине
export const selectCartItem = (title, size, type) => (state) =>
    state.cart.cart.find((obj) => obj.title === title && obj.size === size && obj.type === type);

export const { calcPriceAndItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
