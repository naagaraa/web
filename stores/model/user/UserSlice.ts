// src/store/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
    name: string;
    age: number;
}

// Initial state of the user
const initialState: UserState = {
    name: '',
    age: 0,
};

// Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.name = action.payload.name;
            state.age = action.payload.age;
        },
    },
});

// Export the actions and reducer
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
