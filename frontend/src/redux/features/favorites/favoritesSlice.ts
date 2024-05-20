import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export interface IAddFavorites {
    favoriteId: string;
}

export interface IFavoritesState {
    favorites: string[];
    isLoading: boolean;
}

export const getFavorites = createAsyncThunk('favorites/getFavorite', async () => {
    try {
        const { data } = await axios.get('/favorites');

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async ({ favoriteId }: IAddFavorites) => {
    try {
        const { data } = await axios.post('/favorites/add', { favoriteId });

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async ({ favoriteId }: IAddFavorites) => {
    try {
        const { data } = await axios.post('/favorites/remove', { favoriteId });
        return data;
    } catch (error) {
        console.log(error);
    }
});

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        isLoading: false,
    } as IFavoritesState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = action.payload.favorites.products;
            })
            .addCase(addFavorite.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(removeFavorite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = state.favorites.filter((id) => id !== action.payload.favoriteId);
            })
            .addCase(removeFavorite.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = action.payload.favorites.products;
            })
            .addCase(getFavorites.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default favoritesSlice.reducer;
