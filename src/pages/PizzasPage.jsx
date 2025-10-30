import React from 'react';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

import { useSelector, useDispatch } from 'react-redux';
import { pizzaThunk } from '../redux/slices/pizzaThunkSlice';
import { searchIt } from '../redux/slices/searchSlice';
import { changePage } from '../redux/slices/paginationSlice';

export default function PizzasPage() {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(true);

    const curPage = useSelector((state) => state.pagination.curPage);
    const curCategory = useSelector((state) => state.filter.curCategory);
    const curSort = useSelector((state) => state.sorting.curSorting);
    const searchValue = useSelector((state) => state.search.searchValue);
    const pizzas = useSelector((state) => state.pizza.pizzas);

    React.useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                dispatch(searchIt(''));
                dispatch(changePage(1));

                const response = await dispatch(
                    pizzaThunk({ curPage, curCategory, curSort, searchValue }),
                );

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [curCategory]);

    React.useEffect(() => {
        async function getData() {
            try {
                setLoading(true);

                const response = await dispatch(
                    pizzaThunk({ curPage, curCategory, curSort, searchValue }),
                );

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [curPage, curSort, searchValue]);

    React.useEffect(() => {
        async function getData() {
            try {
                setLoading(true);

                const response = await dispatch(
                    pizzaThunk({
                        curPage,
                        curCategory,
                        curSort,
                        searchValue,
                    }),
                );

                setLoading(false);
            } catch (error) {
                alert.error;
            }
        }

        getData();
    }, []);

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 className="content__title">{searchValue ? searchValue : 'Все пиццы'}</h2>
                <div className="content__items">
                    {loading ? (
                        [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                    ) : pizzas.length > 0 ? (
                        pizzas.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)
                    ) : (
                        <h1>Пицц нет</h1>
                    )}
                </div>
            </div>

            <Pagination />
        </div>
    );
}
