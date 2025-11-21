import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

export const pizzaThunk = createAsyncThunk('pizza/fetchData', async (params) => {
    const { curPage, curCategory, curSorting, searchValue } = params;

    const paramsQuery = qs.stringify({
        page: curPage,
        limit: 4,
        category: curCategory ? curCategory : '',
        sortBy: curSorting.type,
        title: searchValue,
        order: curSorting.order,
    });

    const url = `/api/pizzas?${paramsQuery}`;

    const { data } = await axios.get(url.toString());
    return data;
});
