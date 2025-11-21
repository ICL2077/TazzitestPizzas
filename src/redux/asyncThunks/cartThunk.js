import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const cartThunk = createAsyncThunk('cart/fetchData', async (params) => {
    const url = '/api/cart';

    const { data } = await axios.get(url.toString());
    return data;
});
