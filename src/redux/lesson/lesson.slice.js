import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lessons: [],
};

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        saveLesson() {},
        getLesson() {},
        deleteLesson() {},
        getLessonSuccess(state, { payload }) {
            state.lessons = payload;
        },
    },
});

// actions
export const lessonActions = lessonSlice.actions;

// selector

export const lessonSelector = {
    lessons: (state) => state['lessons'].lessons,
};
// reducer
const lessonReducer = lessonSlice.reducer;

export default lessonReducer;
