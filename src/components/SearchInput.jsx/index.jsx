import React from 'react';
import { GlobalContext } from '../../Context/GlobalContext.jsx';

import styles from './SearchInput.module.scss';

export default function SearchInput() {
    const { setSearchValue } = React.useContext(GlobalContext);

    const [searchValueInpt, setSearchValueInpt] = React.useState('');

    const handleInputChange = (event) => {
        setSearchValueInpt(event.target.value);
    };

    const handleEnterKey = () => {
        setSearchValue(searchValueInpt);
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
