// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './model/user/UserSlice';


// RootState: The entire state of the Redux store
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch: The dispatch function used to dispatch actions
export type AppDispatch = typeof store.dispatch;

// Configure the store
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
