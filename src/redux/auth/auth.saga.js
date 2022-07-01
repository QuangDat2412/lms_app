import { call, put, takeEvery } from 'redux-saga/effects';
import { login as loginApi, googleLogin as googleLoginApi } from 'src/apis/auth';
import { authActions } from './auth.slice';
import { callLoading } from '../others/saga';

function* _login({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(loginApi, payload);
            const { data } = res;
            localStorage.setItem('currentUser', JSON.stringify(data));
            yield put(authActions.loginSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}
function* _googleLogin({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(googleLoginApi, payload);
            const { data } = res;
            localStorage.setItem('currentUser', JSON.stringify(data));
            yield put(authActions.loginSuccess(data));
        } catch (error) {}
    }
    yield callLoading(doRQ);
}

function* authSaga() {
    // yield takeLatest(loginActions.login.type, _login);
    yield takeEvery(authActions.login.type, _login);
    yield takeEvery(authActions.googleLogin.type, _googleLogin);
}
export default authSaga;
