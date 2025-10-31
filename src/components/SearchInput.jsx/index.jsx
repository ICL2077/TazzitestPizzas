import React from 'react';
import { searchIt, searchItInpt } from '../../redux/slices/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchInput.module.scss';
import debounce from 'lodash.debounce';

export default function SearchInput() {
    const dispatch = useDispatch();

    const inputRef = React.useRef();

    const searchValueInput = useSelector((state) => state.search.searchValueInpt);

    const delayedDispatchRef = React.useRef(
        debounce((value) => {
            dispatch(searchIt(value));
        }, 500),
    ).current;

    const handleInputChange = (event) => {
        dispatch(searchItInpt(event.target.value));
        delayedDispatchRef(event.target.value);
    };

    const handleClearKey = () => {
        dispatch(searchItInpt(''));
        dispatch(searchIt(''));
        inputRef.current.focus;
    };

    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                className={styles.inpt}
                type="text"
                placeholder="Название пиццы..."
                value={searchValueInput}
                onChange={(event) => handleInputChange(event)}
            />
            {searchValueInput && (
                <img
                    onClick={handleClearKey}
                    height={32}
                    width={32}
                    src="../../../img/remove.svg"
                    alt="remove"
                />
            )}
        </div>
    );
}
