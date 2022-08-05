import React, { useEffect, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { OthersSelector } from 'src/redux/others/slice';
import routes from './routes';
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Learning = React.lazy(() => import('./views/learning'));

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
