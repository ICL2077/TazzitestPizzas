import React from 'react';
import ReactPaginate from 'react-paginate';
import { GlobalContext } from '../../Context/GlobalContext';

import styles from './Pagination.module.scss';

export default function Pagination() {
    const { setCurPage } = React.useContext(GlobalContext);

    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => setCurPage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    );
}
