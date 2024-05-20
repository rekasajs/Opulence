import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export type ProductType = 'Кольца' | 'Браслеты' | 'Колье' | 'Серьги' | 'Цепи' | 'Подвески';

export interface IProduct {
    _id: string;
    name: string;
    type: ProductType;
    material: string;
    grade?: string;
    price: number;
    isAvailable: boolean;
    insertion?: string;
    for: 'для Женщин' | 'для Мужчин';
    description: string;
    imageURL?: string;
}

type ProductsState = {
    products: IProduct[];
    isLoading: boolean;
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    try {
        const { data } = await axios.get('/products');

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false,
    } as ProductsState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default productsSlice.reducer;
