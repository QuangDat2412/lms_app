import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { OthersSelector } from 'src/redux/others/slice';
import './scss/style.scss';
import 'antd/dist/antd.css';
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

// Containers
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Learning = React.lazy(() => import('./views/learning'));
const Home = React.lazy(() => import('./views/home'));
const Profile = React.lazy(() => import('./views/profile'));
const CourseDetails = React.lazy(() => import('./views/courseDetail'));

const App = () => {
    const toasrt = useSelector(OthersSelector.toasrt);
    useEffect(() => {
        if (toasrt.type)
            notification[toasrt.type]({
                description: toasrt.message,
            });
    }, [toasrt]);
    return (
        <BrowserRouter>
            <Suspense fallback={loading}>
                <Routes>
                    <Route exact path="/profile" name="Trang cá nhân" element={<Profile />} />
                    <Route exact path="/login" name="Login Page" element={<Login />} />
                    <Route exact path="/courses/:code" name="Chi tiết khóa" element={<CourseDetails />} />
                    <Route exact path="/" name="Home Page" element={<Home />} />
                    <Route exact path="/learning/:code" name="Learning Page" element={<Learning />} />
                    <Route exact path="/404" name="Page 404" element={<Page404 />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
