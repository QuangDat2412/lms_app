import React, { useEffect, useState, useCallback } from 'react';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelector } from 'src/redux/user/user.slice';
import {
    CFormLabel,
    CForm,
    CModalTitle,
    CModalHeader,
    CModalBody,
    CModal,
    CButton,
    CFormInput,
    CCol,
    CModalFooter,
    CFormSelect,
    CFormFeedback,
    CCard,
    CCardBody,
} from '@coreui/react';
import TableCustom from 'src/components/table';
const Students = () => {
    const dispatch = useDispatch();
    const userForm = { fullName: '', isAdmin: true, email: '', password: 'abc123', avatar: '', phoneNumber: '', status: 1 };
    const filterForm = { name: '', status: 0 };
    const [visible, setVisible] = useState(false);
    const [inputs, setInputs] = useState(userForm);
    const [filter, setFilter] = useState(filterForm);
    const [validated, setValidated] = useState(false);
    const [actionType, setActionType] = useState('');
    useEffect(() => {
        dispatch(userActions.getUser(filter));
    }, [filter, dispatch]);
    const users = useSelector(userSelector.users);

    const openMoDalAdd = (user, type) => {
        if (type === 'update') {
            const _user = { ...user };
            setInputs(_user);
        } else if (type === 'add') {
            setInputs(userForm);
        }
        setActionType(type);
        setVisible(true);
    };
    const data = {
        data: users.map((user, i) => {
            return { ...user, index: i + 1, admin: user.isAdmin ? 'Admin' : 'Người dùng' };
        }),
        actions: [
            {
                key: 'update',
                value: 'Chỉnh sửa',
                openMoDalAdd: function (user, type) {
                    return openMoDalAdd(user, type);
                },
            },
        ],
        header: [
            {
                key: 'index',
                value: 'STT',
            },
            {
                key: 'fullName',
                value: 'Họ Tên',
            },
            {
                key: 'admin',
                value: 'Chức vụ',
            },
            {
                key: 'email',
                value: 'Email',
            },
            {
                key: 'phoneNumber',
                value: 'Số điện thoại',
            },
            {
                key: 'status',
                value: 'Trạng thái',
                type: 'status',
            },
        ],
    };
    const handleChangeFilter = useCallback((e) => {
        setFilter((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const handleChange = useCallback((e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const saveUser = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            Promise.resolve(dispatch(userActions.saveUser({ inputs, type: actionType })))
                .then((data) => {
                    closeModal();
                })
                .catch(() => {});
        }
        setValidated(true);
    };
    const closeModal = () => {
        setValidated(false);
        setVisible(false);
    };
    return (
        <>
            <CCard>
                <CCardBody>
                    <Filter openMoDalAdd={openMoDalAdd} handleChangeFilter={handleChangeFilter} />
                    <TableCustom datas={data} openMoDalAdd={openMoDalAdd} />
                </CCardBody>
            </CCard>

            <CModal visible={visible} onClose={closeModal} size="lg">
                <CModalHeader onClose={closeModal}>
                    <CModalTitle>{actionType === 'add' ? 'Thêm mới người dùng' : 'Chỉnh sửa thông tin:'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={saveUser}>
                        <CCol lg="6">
                            <CFormLabel htmlFor="validationServerUsername">Tên người dùng</CFormLabel>
                            <CFormInput type="text" label="Tên người dùng" required name="fullName" onChange={handleChange} value={inputs.fullName} />
                            <CFormFeedback invalid>Vui lòng nhập tên người dùng.</CFormFeedback>
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel htmlFor="validationServerUsername">Email</CFormLabel>
                            <CFormInput type="email" label="Email" required name="email" onChange={handleChange} value={inputs.email} />
                            <CFormFeedback invalid>Vui lòng nhập Email.</CFormFeedback>
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel htmlFor="validationServerUsername">Số điện thoại</CFormLabel>
                            <CFormInput
                                type="text"
                                label="Số điện thoại"
                                required
                                name="phoneNumber"
                                onChange={handleChange}
                                value={inputs.phoneNumber}
                            />
                            <CFormFeedback invalid>Vui lòng nhập số điện thoại.</CFormFeedback>
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel htmlFor="validationServerUsername">Trạng thái</CFormLabel>
                            <CFormSelect required onChange={handleChange} name="status" value={inputs.status}>
                                <option value="1">Đang hoạt động</option>
                                <option value="2">Ngừng hoạt động</option>
                            </CFormSelect>
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel htmlFor="validationServerUsername">Chức vụ</CFormLabel>
                            <CFormSelect required onChange={handleChange} name="isAdmin" value={inputs.isAdmin}>
                                <option value="true">Admin</option>
                                <option value="false">Người dùng</option>
                            </CFormSelect>
                        </CCol>

                        <CModalFooter>
                            <CButton color="secondary" onClick={closeModal} className="btn-modal">
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

export default Students;
