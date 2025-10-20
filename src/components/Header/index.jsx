import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput.jsx';

import styles from './Header.module.scss';

export default function Header() {
    return (
        <div className="header">
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img width="38" src="../img/logo.svg" alt="Pizza logo" />
                    </Link>
                    <div className={styles.logo}>
                        <h1>Tazztiest Pizzas</h1>
                        <p>Лучшая пицца! Никаких медведей!</p>
                    </div>
                </div>

                <SearchInput />

                <div className="header__cart">
                    <Link to="/cart" className="button button--cart">
                        <span>520 ₽</span>
                        <div className="button__delimiter"></div>
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.56667 15.5667C6.30305 15.5667 6.9 14.9697 6.9 14.2333C6.9 13.4969 6.30305 12.9 5.56667 12.9C4.83029 12.9 4.23334 13.4969 4.23334 14.2333C4.23334 14.9697 4.83029 15.5667 5.56667 15.5667Z"
                                stroke="white"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M13.5667 15.5667C14.3031 15.5667 14.9 14.9697 14.9 14.2333C14.9 13.4969 14.3031 12.9 13.5667 12.9C12.8303 12.9 12.2333 13.4969 12.2333 14.2333C12.2333 14.9697 12.8303 15.5667 13.5667 15.5667Z"
                                stroke="white"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M4.01336 4.23333H15.5667L14.4467 9.82666C14.3857 10.1336 14.2188 10.4093 13.975 10.6055C13.7312 10.8018 13.4262 10.906 13.1134 10.9H6.06669C5.74115 10.9028 5.42584 10.7863 5.18023 10.5726C4.93462 10.3589 4.77567 10.0628 4.73336 9.73999L3.72002 2.05999C3.678 1.73948 3.52097 1.44516 3.27816 1.23177C3.03534 1.01839 2.72328 0.900483 2.40002 0.899994H0.900024"
                                stroke="white"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <span>3</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
