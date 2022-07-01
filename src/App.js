import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Learning = React.lazy(() => import('./views/learning'));
const Home = React.lazy(() => import('./views/home'));
const CourseDetails = React.lazy(() => import('./views/courseDetail'));

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={loading}>
                    <Routes>
                        <Route exact path="/login" name="Login Page" element={<Login />} />
                        <Route exact path="/courses/:code" name="Chi tiết khóa" element={<CourseDetails />} />
                        <Route exact path="/" name="Home Page" element={<Home />} />
                        <Route exact path="/learning/:code" name="Learning Page" element={<Learning />} />
                        <Route exact path="/404" name="Page 404" element={<Page404 />} />
                        <Route path="*" name="Trang chủ" element={<DefaultLayout />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        );
    }
}

export default App;
