import { createSlice } from '@reduxjs/toolkit';
import { cartThunk } from '../asyncThunks/cartThunk';

interface CartItemType {
    id: number;
    title: string;
    imageUrl: string;
    type: string;
    size: number;
    price: number;
    amount: number;
}

interface initialStateTypes {
    cart: CartItemType[];
    loading: boolean;
    totalPrice: number;
    totalItems: number;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        loading: true,
        totalPrice: 0,
        totalItems: 0,
    } as initialStateTypes,
    reducers: {
        calcPriceAndItems: (state) => {
            state.totalPrice = state.cart.reduce(
                (globalPrice, curItem: CartItemType) =>
                    globalPrice + curItem.price * curItem.amount,
                0,
            );

            state.totalItems = state.cart.reduce(
                (allItems, curItem: CartItemType) => allItems + curItem.amount,
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

export const selectCart = (state: any) => state.cart;

// селектор для нахождения идентичного товара в корзине
export const selectCartItem = (title: string, size: number, type: string) => (state: any) =>
    state.cart.cart.find(
        (obj: CartItemType) => obj.title === title && obj.size === size && obj.type === type,
    );

export const { calcPriceAndItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
