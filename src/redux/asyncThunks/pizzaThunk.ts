// libs
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { changePage } from '../slices/paginationSlice';
import { clickOnCat } from '../slices/filterSlice';
import { changeSortIndex, changeSorting } from '../slices/sortingSlice';
import { searchIt, searchItInpt } from '../slices/searchSlice';
import { sorting } from '../slices/sortingSlice';

export interface fetchPizzaType {
    curPage: number;
    curCategory: number;
    curSorting: sorting;
    sortIndex: number;
    searchValue: string;
}

export const pizzaThunk = createAsyncThunk(
    'pizza/fetchData',
    async (params: fetchPizzaType, thunkApi) => {
        const { curPage, curCategory, curSorting, sortIndex, searchValue } = params;

        thunkApi.dispatch(changePage(curPage));
        thunkApi.dispatch(clickOnCat(curCategory));
        thunkApi.dispatch(changeSorting(sortIndex));
        thunkApi.dispatch(changeSortIndex(sortIndex));
        thunkApi.dispatch(searchIt(searchValue));
        thunkApi.dispatch(searchItInpt(searchValue));

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
    },
);
