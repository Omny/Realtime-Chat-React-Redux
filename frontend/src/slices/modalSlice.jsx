import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    modalType: null,
    idToUpdate: null,
  },
  reducers: {
    openModal: (state, action) => ({
      isVisible: true,
      modalType: action.payload.modalType,
      idToUpdate: action.payload.idToUpdate ?? null,
    }),
    closeModal: () => ({
      isVisible: false,
      modalType: null,
      idToUpdate: null,
    }),
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;
