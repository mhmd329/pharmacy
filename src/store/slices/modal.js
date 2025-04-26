import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalName: "",

};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalName = action.payload;
      console.log(action.payload);
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalName = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
