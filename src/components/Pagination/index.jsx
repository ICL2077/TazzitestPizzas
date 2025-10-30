import React from 'react';
import ReactPaginate from 'react-paginate';
import { changePage } from '../../redux/slices/paginationSlice';
import { useDispatch } from 'react-redux';

import styles from './Pagination.module.scss';

export default function Pagination() {
    const dispatch = useDispatch();

    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => dispatch(changePage(event.selected + 1))}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    );
}
