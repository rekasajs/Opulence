import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import navigationSlice from './features/navigation/navigationSlice';
import productsSlice from './features/products/productsSlice';
import modalSlice from './features/modal/modalSlice';
import favoritesSlice from './features/favorites/favoritesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        nav: navigationSlice,
        products: productsSlice,
        modal: modalSlice,
        favorites: favoritesSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
