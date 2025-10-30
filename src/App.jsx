// libs imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// styles imports
import './scss/app.scss';

// component imports
import Header from './components/Header';
import PizzasPage from './pages/PizzasPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';

export default function App() {
    return (
        <div className="wrapper">
            <Header />

            <Routes>
                <Route path="/" element={<PizzasPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
