import React, { useState } from 'react';
import {
    CAvatar,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CFormLabel,
    CFormInput,
    CButton,
    CCol,
    CRow,
    CModalTitle,
    CForm,
} from '@coreui/react';
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { authSelector, authActions } from 'src/redux/auth/auth.slice';
import { useSelector, useDispatch } from 'react-redux';
import UploadImage from '../uploadImage';

const AppHeaderDropdown = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(authSelector.currentUser);
    const logout = (e) => {
        e.preventDefault();
        dispatch(authActions.logout());
    };
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [inputs, setForm] = useState({ ...currentUser });

    const handleChange = (e) => {
        setForm((p) => {
            return { ...p, [e.target.name]: e.target.value };
        });
    };

    const save = (event) => {
        event.preventDefault();
        const _form = event.currentTarget;
        setValidated(true);
        if (_form.checkValidity()) {
            let model = { fullName: inputs.fullName, phoneNumber: inputs.phoneNumber, avatar: inputs.avatar, email: inputs.email, _id: inputs._id };
            if (inputs.password && inputs.password != '') model.password = inputs.password;
            Promise.resolve(dispatch(authActions.update(model))).then((res) => {
                setValidated(false);
                setVisible(false);
            });
        }
    };
    const openModal = (event) => {
        event.preventDefault();
        setValidated(false);
        setVisible(true);
        setForm({ ...currentUser, password: '' });
    };
    const setUrl = (event) => {
        setForm((p) => {
            return { ...p, avatar: event };
        });
    };

    return (
        <>
            <CDropdown variant="nav-item">
                <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                    <CAvatar src={currentUser?.avatar} size="md" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownHeader className="bg-light fw-semibold py-2">{currentUser?.fullName}</CDropdownHeader>
                    <CDropdownItem href="/profile">
                        <CIcon icon={cilUser} className="me-2" />
                        Trang cá nhân
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#" onClick={openModal}>
                        <CIcon icon={cilSettings} className="me-2" />
                        Cài đặt
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem
                        href="#"
                        onClick={(e) => {
                            logout(e);
                        }}
                    >
                        <CIcon icon={cilLockLocked} className="me-2" />
                        Đăng xuất
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
            <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>{'Chỉnh sửa thông tin'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={save}>
                        <CCol lg="12">
                            <CRow>
                                <CCol lg="2">
                                    <CFormLabel htmlFor="validationServerUsername">Ảnh đại diện</CFormLabel>
                                    <UploadImage type="avatar" setUrl={setUrl} url={inputs.avatar} />
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel>Email</CFormLabel>
                            <CFormInput type="text" label="Email" name="email" defaultValue={inputs.email} disabled />
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel>Họ và tên</CFormLabel>
                            <CFormInput type="text" label="Họ và tên" required name="fullName" onChange={handleChange} value={inputs.fullName} />
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel>Só điện thoại</CFormLabel>
                            <CFormInput
                                type="text"
                                label="Só điện thoại"
                                required
                                name="phoneNumber"
                                onChange={handleChange}
                                value={inputs.phoneNumber}
                            />
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel>Mật khẩu</CFormLabel>
                            <CFormInput type="password" label="Mật khẩu" name="password" onChange={handleChange} value={inputs.password} />
                        </CCol>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)} className="btn-modal">
                                Đóng
                            </CButton>
                            <CButton color="warning" type="submit" className="btn-modal">
                                Lưu lại
                            </CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

export default AppHeaderDropdown;
