import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserSuccess(state, { payload }) {
            state.users = payload;
        },
        getUser() {},
        saveUserSuccess(state, { payload }) {
            state.users = [...state.users, payload];
        },
        updateUserSuccess(state, { payload }) {
            state.users = state.users.map((u) => {
                if (payload._id === u._id) {
                    return payload;
                }
                return u;
            });
        },
        saveUser() {},
    },
});

// actions
export const userActions = userSlice.actions;

// selector

export const userSelector = {
    users: (state) => state['users'].users,
};
// reducer
const userReducer = userSlice.reducer;

export default userReducer;
