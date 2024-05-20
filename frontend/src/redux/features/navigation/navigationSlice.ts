import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        isMenuActive: false,
    },
    reducers: {
        openBurgerMenu: (state) => {
            state.isMenuActive = true;
        },
        closeBurgerMenu: (state) => {
            state.isMenuActive = false;
        },
    },
});

export const { openBurgerMenu, closeBurgerMenu } = navigationSlice.actions;
export default navigationSlice.reducer;
