import axios from 'axios';
import React from 'react';

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
    const categories = ['Все', 'Мясные', 'Вегетерианские'];
    const [curCategory, setCurCategory] = React.useState(0);

    //sorting logic
    const listOfSorting = [
        { name: 'популярности', type: 'rating', order: 'desc' },
        { name: 'алфавиту', type: 'title', order: 'asc' },
        { name: 'цене', type: 'price', order: 'asc' },
    ];

    const [curSorting, setCurSorting] = React.useState(listOfSorting[0]);

    // fetch logic
    React.useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const url = new URL(
                    `https://68da669423ebc87faa2fff70.mockapi.io/pizzas?limit=4&${
                        curCategory > 0 ? `category=${curCategory}` : ''
                    }`,
                );

                url.searchParams.append('page', curPage);
                url.searchParams.append('sortBy', curSorting.type);
                url.searchParams.append('title', searchValue);
                url.searchParams.append('order', curSorting.order);

                const { data } = await axios.get(url);

                setLoading(false);
                setPizzas(data);
            } catch (error) {
                console.log('Error -', error);
            }
        }

        fetchData();
    }, [curCategory, curSorting, searchValue, curPage]);

    // first fetch
    React.useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const url = new URL(
                    'https://68da669423ebc87faa2fff70.mockapi.io/pizzas?page=1&limit=4',
                );
                const { data } = await axios.get(url);

                setLoading(false);
                setPizzas(data);
            } catch (error) {
                alert('Error - ', error);
            }
        }
        fetchData();
    }, []);

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
