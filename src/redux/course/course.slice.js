import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    course: {},
    listLearn: [],
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        saveCourse() {},
        getCourseSuccess(state, { payload }) {
            state.courses = payload.map((p) => {
                return { ...p, typeObj: p.type, type: p.type._id };
            });
        },
        getCourseByCodeSuccess(state, { payload }) {
            state.course = payload;
        },
        getLearningSuccess(state, { payload }) {
            state.listLearn = payload;
        },
        getCourse() {},
        getLearning() {},
        registerCourse() {},
        getCourseByCode() {},
        deleteCourse() {},
    },
});

// actions
export const courseActions = courseSlice.actions;

// selector

export const courseSelector = {
    courses: (state) => state['courses'].courses,
    listLearn: (state) => state['courses'].listLearn,
    course: (state) => state['courses'].course,
};
// reducer
const courseReducer = courseSlice.reducer;

export default courseReducer;
