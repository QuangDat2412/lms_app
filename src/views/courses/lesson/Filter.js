import React from 'react';
import { CCol, CRow, CInputGroup, CInputGroupText, CFormInput, CButton, CFormSelect } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import PropTypes from 'prop-types';
const Filter = (props) => {
    const { openMoDalAdd, handleChangeFilter, courses, topics } = props;
    const open = (event) => {
        event.preventDefault();
        openMoDalAdd({}, 'add');
    };
    return (
        <>
            <CRow xs={{ gutterX: 2, gutterY: 2 }}>
                <CCol lg={3}>
                    <CRow>
                        <CCol xs={7}>
                            <h4>Danh sách bài học</h4>
                        </CCol>
                        <CCol xs={5}>
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
                        <CInputGroupText id="basic-addon1">Chủ đề</CInputGroupText>
                        <CFormSelect onChange={handleChangeFilter} name="topicId">
                            <option value={0} key={-1}>
                                Tất cả
                            </option>
                            {topics.map((t) => {
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
    topics: PropTypes.array,
};
export default Filter;
