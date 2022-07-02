import { call, put, takeEvery, debounce } from 'redux-saga/effects';
import {
    addCourse,
    getCourse,
    getCourseByCode,
    deleteCourse,
    registerCourse,
    getLearning,
    doneLesson,
    search,
    getLearningByUserId,
} from 'src/apis/course';
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
function* _searchCourse({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(search, payload);
            const { data } = res;
            yield put(courseActions._searchCourseSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* _doneLesson({ payload }) {
    function* doRQ() {
        try {
            yield call(doneLesson, payload);
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* _getAllLearning({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getLearning, payload);
            const { data } = res;
            yield put(courseActions.getLearningSuccess(data));
        } catch (error) {
            yield put(courseActions.getLearningSuccess({}));
        }
    }
    yield callLoading(doRQ);
}
function* _getLearningByUserId({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getLearningByUserId, payload);
            const { data } = res;
            yield put(courseActions.getLearningByUserIdSuccess(data));
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
    yield debounce(300, courseActions.searchCourse.type, _searchCourse);
    yield takeEvery(courseActions.getLearning.type, _getAllLearning);
    yield takeEvery(courseActions.getLearningByUserId.type, _getLearningByUserId);
    yield takeEvery(courseActions.getCourseByCode.type, getByCode);
    yield takeEvery(courseActions.deleteCourse.type, _deleteCourse);
    yield takeEvery(courseActions.done.type, _doneLesson);
}
export default courseSaga;
