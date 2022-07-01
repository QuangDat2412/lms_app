import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topics: [],
};

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        saveTopic() {},
        getTopic() {},
        deleteTopic() {},
        getTopicSuccess(state, { payload }) {
            state.topics = payload;
        },
    },
});

// actions
export const topicActions = topicSlice.actions;

// selector

export const topicSelector = {
    topics: (state) => state['topics'].topics,
};
// reducer
const topicReducer = topicSlice.reducer;

export default topicReducer;
