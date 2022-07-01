import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { authActions } from 'src/redux/auth/auth.slice';
import { OthersAction } from 'src/redux/others/slice';
import { cilUser, cilLockLocked } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from 'src/redux/auth/auth.slice';
const Login = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(authSelector.currentUser);

    const dispatch = useDispatch();
    const responseSuccessGoogle = (res) => {
        Promise.resolve(dispatch(authActions.googleLogin({ tokenId: res.tokenId }))).then(() => {
            dispatch(OthersAction.getOptions());
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
        if (form.checkValidity()) {
            Promise.resolve(dispatch(authActions.login({ email, password }))).then(() => {
                dispatch(OthersAction.getOptions());
            });
        }
        setValidated(true);
    };
    const responseErrorGoogle = (res) => {};
    const [type, setType] = useState('');
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardBody>
                                <div className="text-center">
                                    <h1>Đăng nhập vào LMS APP</h1>
                                </div>
                                {type === 'email' ? (
                                    <>
                                        <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
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
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
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
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton color="primary" className="px-4" type="submit">
                                                        Login
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={6} className="text-right">
                                                    <CButton color="link" className="px-0">
                                                        Forgot password?
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </>
                                ) : (
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
