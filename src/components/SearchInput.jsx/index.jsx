import React from 'react';
import { searchIt } from '../../redux/slices/searchSlice';
import { useDispatch } from 'react-redux';
import styles from './SearchInput.module.scss';

export default function SearchInput() {
    const dispatch = useDispatch();

    const [searchValueInpt, setSearchValueInpt] = React.useState('');

    const handleInputChange = (event) => {
        setSearchValueInpt(event.target.value);
    };

    const handleEnterKey = () => {
        dispatch(searchIt(searchValueInpt));
        setSearchValueInpt('');
    };

    return (
        <div className={styles.root}>
            <input
                className={styles.inpt}
                type="text"
                placeholder="Название пиццы..."
                value={searchValueInpt}
                onChange={(event) => handleInputChange(event)}
                onKeyPress={(event) => event.key === 'Enter' && handleEnterKey()}
            />
        </div>
    );
}
