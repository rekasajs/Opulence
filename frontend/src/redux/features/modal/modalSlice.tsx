import { createSlice } from '@reduxjs/toolkit';

export interface IModalInitialState {
    isModalOpen: boolean;
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
    } as IModalInitialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
