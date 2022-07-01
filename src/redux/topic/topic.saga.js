import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { addTopic, getTopic, deleteTopic } from 'src/apis/course';
import { topicActions } from './topic.slice';
import { callLoading } from '../others/saga';

function* _addTopic({ payload }) {
    function* doRQ() {
        yield call(addTopic, payload);
    }
    yield callLoading(doRQ);
}

function* _getTopic({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getTopic, payload);
            const { data } = res;
            yield put(topicActions.getTopicSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}

function* _deleteTopic({ payload }) {
    function* doRQ() {
        try {
            yield call(deleteTopic, payload);
        } catch (error) {}
    }
    yield callLoading(doRQ);
}

function* topicSaga() {
    yield takeEvery(topicActions.saveTopic.type, _addTopic);
    yield debounce(300, topicActions.getTopic.type, _getTopic);
    yield takeEvery(topicActions.deleteTopic.type, _deleteTopic);
}
export default topicSaga;
