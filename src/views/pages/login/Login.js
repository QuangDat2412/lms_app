import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CFormLabel, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { authActions } from 'src/redux/auth/auth.slice';
import { OthersAction } from 'src/redux/others/slice';
import { cilUser, cilLockLocked } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from 'src/redux/auth/auth.slice';
import { sendOtp } from 'src/apis/auth';

const Login = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(authSelector.currentUser);
    const dispatch = useDispatch();
    const responseSuccessGoogle = (res) => {
        Promise.resolve(dispatch(authActions.googleLogin({ tokenId: res.tokenId }))).then(() => {
            dispatch(OthersAction.getOptions());
        });
    };
    const _sendOtp = (model) => {
        sendOtp(model)
            .then((res) => {
                dispatch(OthersAction.showToasrt({ type: res.status == 200 ? 'success' : 'error', message: res.data.message }));
            })
            .catch(() => {
                dispatch(OthersAction.showToasrt({ type: 'error', message: 'Gửi mã OTP thất bại' }));
            });
    };
    useEffect(() => {
        if (currentUser?.email) {
            navigate('/', { replace: true });
        }
    }, [currentUser, navigate]);
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('false');
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setValidated(true);
        if (form.checkValidity()) {
            Promise.resolve(dispatch(authActions.login({ email, password }))).then((res) => {
                console.log(res);
                debugger;
                setValidated(false);
                dispatch(OthersAction.getOptions());
            });
        }
    };
    const handleRegister = (event) => {
        event.preventDefault();
        const _form = event.currentTarget;
        setValidated(true);
        if (_form.checkValidity()) {
            Promise.resolve(dispatch(authActions.register(form))).then((res) => {
                setValidated(false);
                setForm({ ...initinal });
                setType('email');
            });
        }
    };
    const handleForgot = (event) => {
        event.preventDefault();
        const _form = event.currentTarget;
        setValidated(true);
        if (_form.checkValidity()) {
            Promise.resolve(dispatch(authActions.forgotPassword({ email: form.email, password: form.password, otp: form.otp }))).then(() => {
                setValidated(false);
                setForm({ ...initinal });
                setType('email');
            });
        }
    };

    const responseErrorGoogle = (res) => {};
    const [type, setType] = useState('start');
    const initinal = { email: '', fullName: '', otp: '', password: '' };
    const [form, setForm] = useState({ ...initinal });

    const handleChange = (e) => {
        setForm((p) => {
            return { ...p, [e.target.name]: e.target.value };
        });
    };
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer style={{ width: '900px' }}>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <div className="text-center">
                                    <h1>Đăng nhập vào LMS APP</h1>
                                </div>
                                {type === 'register' && (
                                    <>
                                        <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleRegister}>
                                            <CRow className="my-3 g-4">
                                                <CCol lg="12">
                                                    <CFormLabel>Email</CFormLabel>
                                                    <CFormInput
                                                        placeholder="Email"
                                                        autoComplete="email"
                                                        name="email"
                                                        type="email"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </CCol>
                                                <CCol lg="12">
                                                    <CFormLabel>Họ tên</CFormLabel>
                                                    <CFormInput
                                                        placeholder="Họ và tên"
                                                        autoComplete="fullName"
                                                        name="fullName"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </CCol>
                                                <CCol lg="12">
                                                    <CFormLabel>Mật khẩu</CFormLabel>
                                                    <CFormInput
                                                        type="password"
                                                        placeholder="Password"
                                                        autoComplete="current-password"
                                                        name="password"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </CCol>
                                                <CCol lg="12">
                                                    <CFormLabel>Mã xác nhận</CFormLabel>
                                                    <CInputGroup className="mb-3">
                                                        <CFormInput name="otp" required onChange={handleChange} />
                                                        <CButton
                                                            type="button"
                                                            color="success text-white"
                                                            id="button-addon2"
                                                            disabled={form.email === ''}
                                                            onClick={() => {
                                                                _sendOtp({ email: form.email, type: 'register' });
                                                            }}
                                                        >
                                                            Gửi mã
                                                        </CButton>
                                                    </CInputGroup>
                                                </CCol>
                                            </CRow>

                                            <CRow className="g-2">
                                                <CCol xs={12}>
                                                    <CButton color="success text-white" className="px-4" type="submit" style={{ width: '100%' }}>
                                                        Đăng ký
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={12} className="text-right">
                                                    <CButton
                                                        color="link"
                                                        className="px-0"
                                                        style={{ textDecoration: 'none' }}
                                                        onClick={() => {
                                                            setType('email');
                                                        }}
                                                    >
                                                        Đăng nhập
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </>
                                )}
                                {type === 'forgot' && (
                                    <>
                                        <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleForgot}>
                                            <CRow className="my-3 g-4">
                                                <CCol lg="12">
                                                    <CFormLabel>Email</CFormLabel>
                                                    <CFormInput
                                                        placeholder="Email"
                                                        autoComplete="email"
                                                        name="email"
                                                        type="email"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </CCol>
                                                <CCol lg="12">
                                                    <CFormLabel>Mã xác nhận</CFormLabel>
                                                    <CInputGroup className="mb-3">
                                                        <CFormInput name="otp" required onChange={handleChange} />
                                                        <CButton
                                                            type="button"
                                                            color="success text-white"
                                                            id="button-addon2"
                                                            disabled={form.email === ''}
                                                            onClick={() => {
                                                                _sendOtp({ email: form.email, type: 'forgot-password' });
                                                            }}
                                                            required
                                                        >
                                                            Gửi mã
                                                        </CButton>
                                                    </CInputGroup>
                                                </CCol>
                                                <CCol lg="12">
                                                    <CFormLabel>Mật khẩu</CFormLabel>
                                                    <CFormInput
                                                        type="password"
                                                        placeholder="Password"
                                                        autoComplete="current-password"
                                                        name="password"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="g-2">
                                                <CCol xs={12}>
                                                    <CButton color="success text-white" className="px-4" type="submit" style={{ width: '100%' }}>
                                                        Đăng ký
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={12} className="text-right">
                                                    <CButton
                                                        color="link"
                                                        className="px-0"
                                                        style={{ textDecoration: 'none' }}
                                                        onClick={() => {
                                                            setType('email');
                                                        }}
                                                    >
                                                        Đăng nhập
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </>
                                )}
                                {type === 'email' && (
                                    <>
                                        <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                                            <CRow className="my-3 g-4">
                                                <CCol lg="12">
                                                    <CFormLabel>Email</CFormLabel>
                                                    <CFormInput
                                                        placeholder="Email"
                                                        autoComplete="email"
                                                        name="email"
                                                        type="email"
                                                        onChange={(e) => {
                                                            setEmail(e.target.value);
                                                        }}
                                                        required
                                                    />
                                                </CCol>
                                                <CCol lg="12">
                                                    <CFormLabel>Mật khẩu</CFormLabel>
                                                    <CFormInput
                                                        type="password"
                                                        placeholder="Password"
                                                        autoComplete="current-password"
                                                        name="password"
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                        }}
                                                        required
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className="g-2">
                                                <CCol xs={12}>
                                                    <CButton color="success text-white" className="px-4" type="submit" style={{ width: '100%' }}>
                                                        Đăng nhập
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={12} className="text-right">
                                                    <CButton
                                                        color="link"
                                                        className="px-0 me-3"
                                                        style={{ textDecoration: 'none' }}
                                                        onClick={() => {
                                                            setType('forgot');
                                                        }}
                                                    >
                                                        Quên mật khẩu
                                                    </CButton>
                                                    <CButton
                                                        color="link"
                                                        className="px-0"
                                                        style={{ textDecoration: 'none' }}
                                                        onClick={() => {
                                                            setType('register');
                                                        }}
                                                    >
                                                        Đăng ký
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </>
                                )}
                                {type === 'start' && (
                                    <>
                                        <CRow className="login-btn">
                                            <CCol xs={12}>
                                                <CButton
                                                    className="px-4"
                                                    onClick={() => {
                                                        setType('email');
                                                    }}
                                                >
                                                    Sử dụng email
                                                </CButton>
                                            </CCol>
                                            <CCol xs={12}>
                                                <GoogleLogin
                                                    clientId="475624587151-p1e4spm2s469j4s9g7dq3au2flar356k.apps.googleusercontent.com"
                                                    buttonText="Tiếp tục với Google"
                                                    onSuccess={responseSuccessGoogle}
                                                    onFailure={responseErrorGoogle}
                                                    cookiePolicy={'single_host_origin'}
                                                    className="google"
                                                />
                                            </CCol>
                                        </CRow>
                                    </>
                                )}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;
