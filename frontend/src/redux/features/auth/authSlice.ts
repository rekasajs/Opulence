import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export interface IRegisterData {
    username: string;
    password: string;
    email: string;
    role: string;
}

export interface ILoginData {
    username: string;
    password: string;
}

type AuthState = {
    user: string | null;
    token: string | null;
    isLoading: boolean;
    status: string | null;
};

export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, password, email, role }: IRegisterData) => {
    try {
        console.log({ username, password, email, role });
        const { data } = await axios.post('/auth/register', {
            username,
            password,
            email,
            role,
        });

        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }: ILoginData) => {
    try {
        const { data } = await axios.post('/auth/login', {
            username,
            password,
        });

        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getMe = createAsyncThunk('auth/getMe', async () => {
    try {
        const { data } = await axios.get('/auth/me');

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: false,
        status: null,
    } as AuthState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = null;
                state.user = action.payload?.user;
                state.token = action.payload?.token;
            })
            .addCase(getMe.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const checkIsAuth = (state: { auth: { token: string } }) => !!state.auth.token;
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
