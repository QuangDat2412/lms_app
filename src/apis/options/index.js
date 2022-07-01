import { userRequest } from 'src/services/axiosServices';
const LIST_URL = {
    GetAll: `/options`,
    UPLOAD_IMAGE: `/upload/images`,
};
export const getAll = () => userRequest.get(LIST_URL.GetAll);
export const uploadImage = (model) => userRequest.post(LIST_URL.UPLOAD_IMAGE, model);
