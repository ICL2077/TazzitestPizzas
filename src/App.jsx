// libs imports
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// styles imports
import './scss/app.scss';

// component imports
import PizzasPage from './pages/PizzasPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import DetailedPizza from './pages/DetailedPizza';
import MainLayout from './layouts/MainLayout';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index path="" element={<PizzasPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="pizza/:id" element={<DetailedPizza />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
