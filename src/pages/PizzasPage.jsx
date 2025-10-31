import React from 'react';

// components
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

// redux actions
import { useSelector, useDispatch } from 'react-redux';
import { pizzaThunk } from '../redux/slices/pizzaThunkSlice';
import { searchIt, searchItInpt } from '../redux/slices/searchSlice';
import { changePage } from '../redux/slices/paginationSlice';

export default function PizzasPage() {
    const dispatch = useDispatch();

    // redux values
    const curPage = useSelector((state) => state.pagination.curPage);
    const curCategory = useSelector((state) => state.filter.curCategory);
    const curSort = useSelector((state) => state.sorting.curSorting);
    const { searchValue } = useSelector((state) => state.search);
    const { pizzas, loading } = useSelector((state) => state.pizza);

    React.useEffect(() => {
        async function getData() {
            try {
                await dispatch(pizzaThunk({ curPage, curCategory, curSort, searchValue }));
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [curPage, curSort, searchValue]);

    React.useEffect(() => {
        async function getData() {
            try {
                dispatch(searchIt(''));
                dispatch(searchItInpt(''));
                dispatch(changePage(1));

                await dispatch(pizzaThunk({ curPage, curCategory, curSort, searchValue }));
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [curCategory]);

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
