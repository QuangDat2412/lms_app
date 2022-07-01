import React from 'react';
import { CCol, CRow, CInputGroup, CInputGroupText, CFormInput, CButton, CFormSelect } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import PropTypes from 'prop-types';
const Filter = (props) => {
    const { openMoDalAdd, handleChangeFilter, courses } = props;
    const open = (event) => {
        event.preventDefault();
        openMoDalAdd({}, 'add');
    };
    return (
        <>
            <CRow xs={{ gutterX: 2, gutterY: 2 }}>
                <CCol lg={6}>
                    <CRow>
                        <CCol lg={4} xs={6}>
                            <h4>Danh sách chủ đề</h4>
                        </CCol>
                        <CCol lg={8} xs={6}>
                            <CButton type="button" color="secondary" variant="outline" id="button-addon1" onClick={open}>
                                <CIcon icon={cilPlus} /> Thêm mới
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol lg={3}>
                    <CInputGroup className="mb-3">
                        <CInputGroupText id="basic-addon1">Khóa học</CInputGroupText>
                        <CFormSelect onChange={handleChangeFilter} name="courseId">
                            <option value={0} key={-1}>
                                Tất cả
                            </option>
                            {courses.map((t) => {
                                return (
                                    <option value={t._id} key={t._id}>
                                        {t.name}
                                    </option>
                                );
                            })}
                        </CFormSelect>
                    </CInputGroup>
                </CCol>
                <CCol lg={3}>
                    <CInputGroup className="mb-3">
                        <CInputGroupText id="basic-addon1">Tìm kiếm</CInputGroupText>
                        <CFormInput placeholder="Tìm kiếm khóa học" onChange={handleChangeFilter} name="name" />
                    </CInputGroup>
                </CCol>
            </CRow>
        </>
    );
};
Filter.propTypes = {
    openMoDalAdd: PropTypes.func,
    handleChangeFilter: PropTypes.func,
    courses: PropTypes.array,
};
export default Filter;
