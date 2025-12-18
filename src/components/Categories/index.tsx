import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clickOnCat, categories } from '../../redux/slices/filterSlice.js';

export default function Categories() {
    const dispatch = useDispatch();

    const curCategory = useSelector((state: any) => state.filter.curCategory);

    const handleCategoryChange = React.useCallback((index: number) => {
        dispatch(clickOnCat(index));
    }, []);

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={curCategory === index ? 'active' : ''}
                        onClick={() => handleCategoryChange(index)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
