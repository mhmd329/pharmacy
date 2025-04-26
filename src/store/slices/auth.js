import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",  // تخزين التوكن هنا
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;  // تعيين التوكن
    },
    clearToken: (state) => {
      state.token = "";  // مسح التوكن
    }
  },
});

export const { setToken, clearToken } = authSlice.actions;  // تصدير الأكشن
export default authSlice.reducer;  // تصدير الريديكس
