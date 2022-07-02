import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    sCourses: [],
    course: {},
    listLearn: [],
    learn: {},
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
        _searchCourseSuccess(state, { payload }) {
            state.sCourses = payload.map((p) => {
                return { ...p, typeObj: p.type, type: p.type._id };
            });
        },
        getCourseByCodeSuccess(state, { payload }) {
            state.course = payload;
        },
        getLearningByUserIdSuccess(state, { payload }) {
            state.listLearn = payload;
        },
        getLearningSuccess(state, { payload }) {
            state.learn = payload;
        },
        getCourse() {},
        searchCourse() {},
        done() {},
        getLearningByUserId() {},
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
    learn: (state) => state['courses'].learn,
    course: (state) => state['courses'].course,
    sCourses: (state) => state['courses'].sCourses,
};
// reducer
const courseReducer = courseSlice.reducer;

export default courseReducer;
