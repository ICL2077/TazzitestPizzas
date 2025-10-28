import React from 'react';

import { GlobalContext } from '../Context/GlobalContext';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/PizzaCard/Skeleton';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';

import { useSelector, useDispatch } from 'react-redux';
import { changeSorting, listOfSorting } from '../redux/slices/sortingSlice';

export default function PizzasPage() {
    const dispatch = useDispatch();

    // context values
    const { loading, pizzas } = React.useContext(GlobalContext);

    const [sortIndex, setSortIndex] = React.useState(0);
    const [popupOpen, setPopupOpen] = React.useState(false);

    const searchValue = useSelector((state) => state.search.searchValue);
    const curSorting = useSelector((state) => state.sorting.curSorting);

    const handleSort = (index) => {
        setSortIndex(index);
        dispatch(changeSorting(index));
        setPopupOpen(false);
    };

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories />

                    <div className="sort">
                        <div className="sort__label">
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                    fill="#2C2C2C"
                                />
                            </svg>
                            <b>Сортировка по:</b>
                            <span onClick={() => setPopupOpen(true)}>{curSorting.name}</span>
                        </div>
                        {popupOpen && (
                            <div className="sort__popup">
                                <ul>
                                    {listOfSorting.map((sorting, index) => (
                                        <li
                                            key={index}
                                            className={sortIndex === index ? 'active' : ''}
                                            onClick={() => handleSort(index)}>
                                            {sorting.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
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
