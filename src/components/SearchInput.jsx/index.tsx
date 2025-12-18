import React from 'react';
import { searchIt, searchItInpt } from '../../redux/slices/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchInput.module.scss';
import debounce from 'lodash.debounce';

export default function SearchInput() {
    const dispatch = useDispatch();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const searchValueInput = useSelector((state: any) => state.search.searchValueInpt);

    const debouncedSearch = React.useCallback(
        debounce((value) => {
            dispatch(searchIt(value));
        }, 500),
        [],
    );

    const handleInputChange = React.useCallback((value: string) => {
        dispatch(searchItInpt(value));
        debouncedSearch(value);
    }, []);

    const handleClearKey = React.useCallback(() => {
        dispatch(searchItInpt(''));
        dispatch(searchIt(''));

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                className={styles.inpt}
                type="text"
                placeholder="Название пиццы..."
                value={searchValueInput}
                onChange={(event) => handleInputChange(event.target.value)}
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
