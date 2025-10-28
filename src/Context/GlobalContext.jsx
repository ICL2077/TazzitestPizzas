import axios from 'axios';
import React from 'react';

import { search } from '../redux/slices/searchSlice';
import { useSelector, useDispatch } from 'react-redux';

// Конфигурация axios с повторными запросами
const axiosInstance = axios.create({
    timeout: 10000,
    retry: 3,
    retryDelay: 1000,
});

// Интерцептор для повторных запросов
axiosInstance.interceptors.response.use(null, async (error) => {
    const config = error.config;

    if (!config || !config.retry) {
        return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
        return Promise.reject(error);
    }

    config.__retryCount += 1;

    const delay = new Promise((resolve) => {
        setTimeout(() => resolve(), config.retryDelay || 1000);
    });

    await delay;
    return axiosInstance(config);
});

export const GlobalContext = React.createContext();

export default function GlobalContextProvider({ children }) {
    const dispatch = useDispatch();

    // states
    const [curPage, setCurPage] = React.useState(1);
    const [pizzas, setPizzas] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // redux selectors
    const searchValue = useSelector((state) => state.search.searchValue);
    const curCategory = useSelector((state) => state.filter.curCategory);
    const curSorting = useSelector((state) => state.sorting.curSorting);

    // categories logic
    React.useEffect(() => {
        setLoading(true);
        dispatch(search(''));
        setCurPage(1);

        async function fetchData() {
            try {
                const url = new URL(
                    `https://68da669423ebc87faa2fff70.mockapi.io/pizzas?page=1&limit=4`,
                );

                curCategory && url.searchParams.append('category', curCategory);
                url.searchParams.append('sortBy', curSorting.type);
                url.searchParams.append('order', curSorting.order);

                const { data } = await axiosInstance.get(url.toString(), {
                    timeout: 10000,
                });

                setLoading(false);
                setPizzas(data);
            } catch (error) {
                console.log('Error -', error);
            }
        }

        fetchData();
    }, [curCategory]);

    // pagination, sorting, searching logic
    React.useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const url = new URL(
                    `https://68da669423ebc87faa2fff70.mockapi.io/pizzas?page=${curPage}&limit=4`,
                );

                curCategory && url.searchParams.append('category', curCategory);
                url.searchParams.append('sortBy', curSorting.type);
                searchValue && url.searchParams.append('title', searchValue);
                url.searchParams.append('order', curSorting.order);

                const { data } = await axiosInstance.get(url.toString(), {
                    timeout: 10000,
                });

                setLoading(false);
                setPizzas(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [curPage, searchValue, curSorting]);

    return (
        <GlobalContext.Provider
            value={{
                pizzas,
                setPizzas,

                loading,
                setCurPage,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}
