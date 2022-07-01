import React from 'react';

const User = React.lazy(() => import('./views/users'));
const Course = React.lazy(() => import('./views/courses'));
const Topics = React.lazy(() => import('./views/courses/topic'));
const Lessons = React.lazy(() => import('./views/courses/lesson'));

const routes = [
    { path: '/students', name: 'Danh sách người dùng', element: User, isAdmin: true },
    { path: '/topics', name: 'Thêm mới khóa', element: Topics, isAdmin: true },
    { path: '/courses', name: 'Khóa học', element: Course, isAdmin: true },
    { path: '/lessons', name: 'Bài học', element: Lessons, isAdmin: true },
];

export default routes;
