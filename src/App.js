import React, { useEffect, Suspense } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { OthersSelector } from 'src/redux/others/slice';
import 'antd/dist/antd.css';
import routes from './routes';
import { authSelector } from 'src/redux/auth/auth.slice';
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Learning = React.lazy(() => import('./views/learning'));

const App = () => {
    const toasrt = useSelector(OthersSelector.toasrt);
    const currentUser = useSelector(authSelector.currentUser);
    useEffect(() => {
        if (toasrt.type)
            notification[toasrt.type]({
                description: toasrt.message,
            });
    }, [toasrt]);

    return (
        <BrowserRouter>
            <Suspense fallback={<Spin />}>
                <Routes>
                    <Route exact path="/login" name="Login Page" element={<Login />} />
                    <Route exact path="/learning/:code" name="Learning Page" element={<Learning />} />
                    <Route path="/" name="Trang chủ" element={<DefaultLayout />}>
                        {routes.map((route, idx) => {
                            return route.element && <Route key={idx} path={route.path} name={route.name} element={<route.element />} />;
                        })}
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
