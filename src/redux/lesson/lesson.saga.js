import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { addLesson, getLesson, deleteLesson } from 'src/apis/course';
import { lessonActions } from './lesson.slice';
import { callLoading } from '../others/saga';

function* _addLesson({ payload }) {
    function* doRQ() {
        yield call(addLesson, payload);
    }
    yield callLoading(doRQ);
}

function* _getLesson({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getLesson, payload);
            const { data } = res;
            yield put(lessonActions.getLessonSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* _deleteLesson({ payload }) {
    function* doRQ() {
        try {
            yield call(deleteLesson, payload);
        } catch (error) {}
    }
    yield callLoading(doRQ);
}

function* lessonSaga() {
    yield takeEvery(lessonActions.saveLesson.type, _addLesson);
    yield debounce(300, lessonActions.getLesson.type, _getLesson);
    yield takeEvery(lessonActions.deleteLesson.type, _deleteLesson);
}
export default lessonSaga;
