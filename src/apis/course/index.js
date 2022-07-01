import { userRequest } from 'src/services/axiosServices';
const LIST_URL = {
    ADD: `/courses/add`,
    ADD_TOPIC: `/topics/add`,
    ADD_LESSON: `/lessons/add`,
    GET_LESSON: `/lessons/getByModel`,
    REGISTER_COURSE: `/learningCourse/register`,
    GET_TOPIC: `/topics/getByModel`,
    GET_LEARNING: `/learningCourse/get/`,
    GET_BY_MODEL: `/courses/getByModel`,
    GET_BY_CODE: `/courses/getByCode`,
    DELETE_LESSON: `/lessons/`,
    DELETE_TOPIC: `/topics/`,
    DELETE_COURSE: `/courses/`,
};

export const registerCourse = (model) => userRequest.post(LIST_URL.REGISTER_COURSE, model);
export const addCourse = (model) => userRequest.post(LIST_URL.ADD, model);
export const getLearning = (model) => userRequest.get(LIST_URL.GET_LEARNING + model._id);
export const addTopic = (model) => userRequest.post(LIST_URL.ADD_TOPIC, model);
export const addLesson = (model) => userRequest.post(LIST_URL.ADD_LESSON, model);
export const getCourse = (model) => userRequest.post(LIST_URL.GET_BY_MODEL, model);
export const getTopic = (model) => userRequest.post(LIST_URL.GET_TOPIC, model);
export const getLesson = (model) => userRequest.post(LIST_URL.GET_LESSON, model);
export const getCourseByCode = (model) => userRequest.post(LIST_URL.GET_BY_CODE, model);
export const deleteLesson = (model) => userRequest.delete(LIST_URL.DELETE_LESSON + model._id);
export const deleteTopic = (model) => userRequest.delete(LIST_URL.DELETE_TOPIC + model._id);
export const deleteCourse = (model) => userRequest.delete(LIST_URL.DELETE_COURSE + model._id);
