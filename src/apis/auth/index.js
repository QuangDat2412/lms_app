import { publicRequest, userRequest } from 'src/services/axiosServices';
const LIST_URL = {
    LOGIN: `/auth/login`,
    GOOGLE: `/auth/GoogleLogin`,
    REGISTER: `/auth/register`,
    GETCURRENTUSER: '/users/currentUser',
};
export const login = (model) => publicRequest.post(LIST_URL.LOGIN, model);
export const googleLogin = (model) => publicRequest.post(LIST_URL.GOOGLE, model);
export const register = (model) => publicRequest.post(LIST_URL.REGISTER, model);
export const getCurrentUser = () => userRequest.get(LIST_URL.GETCURRENTUSER);
