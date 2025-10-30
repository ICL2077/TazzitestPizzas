import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clickOnCat, categories } from '../../redux/slices/filterSlice.js';

export default function Categories() {
    const curCategory = useSelector((state) => state.filter.curCategory);
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={curCategory === index ? 'active' : ''}
                        onClick={() => dispatch(clickOnCat(index))}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
