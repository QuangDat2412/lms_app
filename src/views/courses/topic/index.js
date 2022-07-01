import React, { useState, useCallback, useEffect } from 'react';
import Filter from './Filter';
import {
    CFormLabel,
    CForm,
    CModalTitle,
    CModalHeader,
    CModalBody,
    CModal,
    CButton,
    CFormInput,
    CCardBody,
    CCard,
    CCol,
    CModalFooter,
    CFormSelect,
    CFormFeedback,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { topicActions, topicSelector } from 'src/redux/topic/topic.slice';
import TableCustom from 'src/components/table';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Topics = () => {
    const topicForm = { name: '', courseId: '', description: '', image: '', listLessons: [] };
    const [inputs, setInputs] = useState({ ...topicForm });
    const filterForm = { name: '', courseId: '0' };
    const [filter, setFilter] = useState(filterForm);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(courseActions.getCourse({ name: '', status: 1 }));
    }, [dispatch]);
    useEffect(() => {
        dispatch(topicActions.getTopic(filter));
    }, [filter, dispatch]);
    const courses = useSelector(courseSelector.courses);
    const topics = useSelector(topicSelector.topics);
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [actionType, setActionType] = useState('');
    const handleChange = useCallback((e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);

    const openMoDalAdd = (topic, type) => {
        if (type === 'update') {
            const _topic = { ...topic };
            setInputs(_topic);
        } else if (type === 'add') {
            setInputs({ ...topicForm });
        }
        setActionType(type);
        setVisible(true);
    };
    const deleteT = (obj) => {
        Promise.resolve(dispatch(topicActions.deleteTopic(obj)))
            .then((data) => {
                dispatch(topicActions.getTopic(filter));
            })
            .catch(() => {});
    };
    const data = {
        data: topics.map((c, i) => {
            return { ...c, course: c.course?.name, index: i + 1 };
        }),
        actions: [
            {
                key: 'update',
                value: 'Chỉnh sửa',
                openMoDalAdd: function (user, type) {
                    return openMoDalAdd(user, type);
                },
            },
            {
                key: 'delete',
                value: 'Xoá',
                openMoDalAdd: function (obj, type) {
                    return deleteT(obj, type);
                },
            },
        ],
        header: [
            {
                key: 'index',
                value: 'STT',
            },
            {
                key: 'name',
                value: 'Tên chủ đề',
            },
            {
                key: 'course',
                value: 'Khoá học',
            },
            {
                key: 'description',
                value: 'Mô tả',
                type: 'html',
            },
        ],
    };
    const handleChangeFilter = useCallback((e) => {
        setFilter((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const saveCourse = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            Promise.resolve(dispatch(topicActions.saveTopic(inputs)))
                .then((data) => {
                    closeModal();
                    dispatch(topicActions.getTopic(filter));
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
                    <Filter openMoDalAdd={openMoDalAdd} handleChangeFilter={handleChangeFilter} courses={courses} />
                    <TableCustom datas={data} />
                </CCardBody>
            </CCard>

            <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>{actionType === 'add' ? 'Thêm mới chủ đề' : 'Chỉnh sửa chủ đề'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={saveCourse}>
                        <CCol lg="6">
                            <CFormLabel htmlFor="validationServerUsername">Tên chủ đề</CFormLabel>
                            <CFormInput type="text" label="Tên chủ đề" required name="name" onChange={handleChange} value={inputs.name} />
                            <CFormFeedback invalid>Vui lòng nhập tên chủ đề.</CFormFeedback>
                        </CCol>
                        <CCol lg="6">
                            <CFormLabel htmlFor="validationServerUsername">Khóa học</CFormLabel>
                            <CFormSelect required name="courseId" onChange={handleChange} value={inputs.courseId}>
                                <option value="">Chọn khóa học</option>
                                {courses.map((t) => {
                                    return (
                                        <option value={t._id} key={t._id}>
                                            {t.name}
                                        </option>
                                    );
                                })}
                            </CFormSelect>
                            <CFormFeedback invalid>Vui lòng chọn khóa học.</CFormFeedback>
                        </CCol>
                        <CCol lg="12">
                            <CFormLabel htmlFor="validationServerUsername">Mô tả</CFormLabel>
                            <CKEditor
                                editor={ClassicEditor}
                                data={inputs.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setInputs((prev) => {
                                        return { ...prev, description: data };
                                    });
                                }}
                            />
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

export default Topics;
