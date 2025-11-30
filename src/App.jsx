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
import DetailedPizza from './pages/DetailedPizza';

export default function App() {
    return (
        <div className="wrapper">
            <Header />

            <Routes>
                <Route index path="/" element={<PizzasPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/pizza/:id" element={<DetailedPizza />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
