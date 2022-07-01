import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    isLogin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, { payload }) {
            state.currentUser = payload;
        },
        login(state) {},
        googleLogin(state) {},
        logout(state) {
            localStorage.removeItem('token');
            state.token = null;
            state.user = {};
        },
    },
});

// actions
export const authActions = authSlice.actions;

// selector

export const authSelector = {
    currentUser: (state) => state['auth'].currentUser,
    isLogin: (state) => state['auth'].isLogin,
};
// reducer
const authReducer = authSlice.reducer;

export default authReducer;
