import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authSlice';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout/Layout';
import { ShopPage } from './pages/ShopPage/ShopPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { getFavorites } from './redux/features/favorites/favoritesSlice';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);

    const location = useLocation();
    useEffect(() => {
        dispatch(getMe());
        dispatch(getFavorites());
    }, [dispatch]);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/products" element={<ShopPage />} />
                    <Route path={'/products/:id'} element={<ProductPage products={products} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
