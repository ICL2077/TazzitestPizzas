import axios from 'axios';
import React from 'react';

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
    // pagination state
    const [curPage, setCurPage] = React.useState(1);

    //loading state
    const [loading, setLoading] = React.useState(true);

    // input state
    const [searchValue, setSearchValue] = React.useState('');

    // state of the pizzas
    const [pizzas, setPizzas] = React.useState([]);

    //arr of categories
    const categories = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];
    const [curCategory, setCurCategory] = React.useState(0);

    //sorting logic
    const listOfSorting = [
        { name: 'популярности', type: 'rating', order: 'desc' },
        { name: 'алфавиту', type: 'title', order: 'asc' },
        { name: 'цене', type: 'price', order: 'asc' },
    ];

    const [curSorting, setCurSorting] = React.useState(listOfSorting[0]);

    // categories logic
    React.useEffect(() => {
        setLoading(true);
        setSearchValue('');
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
                searchValue,
                setSearchValue,

                pizzas,
                setPizzas,

                categories,
                curCategory,
                setCurCategory,

                listOfSorting,
                curSorting,
                setCurSorting,

                loading,

                setCurPage,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}
