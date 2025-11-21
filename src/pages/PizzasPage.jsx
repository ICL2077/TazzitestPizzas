import React from 'react';
import qs from 'qs';

// components
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// redux actions
import { pizzaThunk } from '../redux/asyncThunks/pizzaThunk';
import { cartThunk } from '../redux/asyncThunks/cartThunk';

import { searchIt, searchItInpt } from '../redux/slices/searchSlice';
import { changePage } from '../redux/slices/paginationSlice';
import { changeSortIndex, changeSorting, listOfSorting } from '../redux/slices/sortingSlice';
import { clickOnCat } from '../redux/slices/filterSlice';

export default function PizzasPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSearchRef = React.useRef(true);
    const blockFirstRender = React.useRef(true);

    // fetch data func
    const getData = React.useCallback(async (obj) => {
        try {
            await dispatch(pizzaThunk(obj));
            isSearchRef.current = false; // разблокировка useEffect
        } catch (error) {
            console.log(error);
        }
    }, []);

    // redux values
    const { curPage, curCategory, curSorting, sortIndex, searchValue, pizzas, loading } =
        useSelector((state) => ({
            curPage: state.pagination.curPage,
            curCategory: state.filter.curCategory,
            curSorting: state.sorting.curSorting,
            sortIndex: state.sorting.sortIndex,
            searchValue: state.search.searchValue,
            pizzas: state.pizza.pizzas,
            loading: state.pizza.loading,
        }));

    // хук для сохранения изменений на сайте после перезагрузки
    React.useEffect(() => {
        dispatch(cartThunk());

        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            // меняем значения в redux для изменениях в UI
            dispatch(changePage(Number(params.curPage)));
            dispatch(clickOnCat(Number(params.curCategory)));
            dispatch(changeSorting(Number(params.sortIndex)));
            dispatch(changeSortIndex(Number(params.sortIndex)));
            dispatch(searchIt(params.searchValue));
            dispatch(searchItInpt(params.searchValue));

            // формируем get-запрос на backEnd исходя из спарсенных данных в url
            getData({
                curPage: Number(params.curPage),
                curCategory: Number(params.curCategory), // используем Number так как спарсенные значения являются строками
                curSorting: listOfSorting[params.sortIndex], // берем объект сортировки исходя из переданного индекса сортировки (в curSorting возвращается строка type)
                searchValue: params.searchValue,
            });
        } else {
            getData({ curPage, curCategory, curSorting, searchValue });
        }

        return () => {
            isSearchRef.current = true;
        };
    }, []);

    // useEffect для изменения ui и запроса на бэк
    React.useEffect(() => {
        // блокирую первый запрос этого useEffect чтобы не происходило 2 идентичных запроса
        !isSearchRef.current && getData({ curPage, curCategory, curSorting, searchValue });
    }, [curPage, curSorting, searchValue, curCategory]);

    // парсим объект в строку и вшываем её в url
    React.useEffect(() => {
        // при первом рендере не даем вшить спарсенную строку в url
        if (!blockFirstRender.current) {
            // формируем строку которую вшьём в url браузера исходя из объекта
            const queryString = qs.stringify({
                curCategory,
                curSorting: curSorting.type,
                sortIndex,
                curPage,
                searchValue,
            });

            navigate(`?${queryString}`);
        }

        blockFirstRender.current = false;
    }, [curCategory, curSorting, curPage, searchValue, sortIndex]);

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
