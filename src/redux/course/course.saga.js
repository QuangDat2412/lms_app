import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import { addCourse, getCourse, getCourseByCode, deleteCourse, registerCourse, getLearning } from 'src/apis/course';
import { courseActions } from './course.slice';
import { callLoading } from '../others/saga';

function* add({ payload }) {
    function* doRQ() {
        yield call(addCourse, payload);
    }
    yield callLoading(doRQ);
}
function* get({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getCourse, payload);
            const { data } = res;
            yield put(courseActions.getCourseSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* _getLearning({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getLearning, payload);
            const { data } = res;
            yield put(courseActions.getLearningSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* register({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(registerCourse, payload);
            const { data } = res;
            yield put(courseActions.registerCourseSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* _deleteCourse({ payload }) {
    function* doRQ() {
        try {
            yield call(deleteCourse, payload);
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* getByCode({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getCourseByCode, payload);
            const { data } = res;
            yield put(courseActions.getCourseByCodeSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* courseSaga() {
    yield takeEvery(courseActions.saveCourse.type, add);
    yield takeEvery(courseActions.registerCourse.type, register);
    yield debounce(300, courseActions.getCourse.type, get);
    yield takeEvery(courseActions.getLearning.type, _getLearning);
    yield takeEvery(courseActions.getCourseByCode.type, getByCode);
    yield takeEvery(courseActions.deleteCourse.type, _deleteCourse);
}
export default courseSaga;
