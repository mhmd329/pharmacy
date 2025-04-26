import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modal';
import sidebarReducer from './slices/sidebarSlice';
import authReducer from './slices/auth';
import cartReducer from './slices/Caart';

const rootReducer = combineReducers({
  modal: modalReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
