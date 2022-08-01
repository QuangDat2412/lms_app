import React, { useState, useEffect } from 'react';
import { CCol, CRow, CContainer, CCard, CCardText, CCardTitle, CCardBody } from '@coreui/react';
import './index.scss';
import { cilPeople } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import { useNavigate } from 'react-router-dom';
import { OthersSelector } from 'src/redux/others/slice';

const Home = () => {
    let navigate = useNavigate();
    const filterForm = { name: '', status: 0 };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(courseActions.getCourse(filterForm));
    }, [dispatch]);
    const options = useSelector(OthersSelector.options);
    const courses = useSelector(courseSelector.courses);
    const [courses1, setCourses1] = useState([]);
    const [courses2, setCourses2] = useState([]);

    const typeCourse = options?.typeCourse || [];
    useEffect(() => {
        if (typeCourse.length > 0) {
            setCourses1(courses.filter((x) => x.type === typeCourse[0]?._id));
            setCourses2(courses.filter((x) => x.type === typeCourse[1]?._id));
        }
    }, [dispatch, courses, typeCourse]);
    return (
        <>
            <AppHeader />
            <CContainer className="mt-4">
                <CRow>
                    <h4 style={{ fontWeight: 'bold' }}>Lộ trình học Tiếng Anh cơ bản</h4>
                    {courses1.map((c, i) => {
                        return (
                            <CCol lg="3" key={i}>
                                <CCard
                                    style={{ width: '100%', border: 'none', cursor: 'pointer' }}
                                    onClick={() => {
                                        navigate('/courses/' + c.code, { replace: true });
                                    }}
                                >
                                    <div className="cus-box-img thumbnail">
                                        <div className="img">
                                            <img src={c.image} alt="" />
                                        </div>
                                    </div>
                                    <CCardBody>
                                        <CCardTitle style={{ fontWeight: 'bold' }}>{c.name}</CCardTitle>
                                        <CCardText>
                                            <CIcon icon={cilPeople} className="me-2" />
                                            {c.count}
                                        </CCardText>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        );
                    })}
                </CRow>
                <CRow>
                    <h4 style={{ fontWeight: 'bold' }}>Lộ trình học Tiếng Anh nâng cao</h4>
                    {courses2.map((c, i) => {
                        return (
                            <CCol lg="3" key={i}>
                                <CCard style={{ width: '100%', border: 'none' }}>
                                    <div className="cus-box-img thumbnail">
                                        <div className="img">
                                            <img src={c.image} alt="" />
                                        </div>
                                    </div>
                                    <CCardBody>
                                        <CCardTitle style={{ fontWeight: 'bold' }}>{c.name}</CCardTitle>
                                        <CCardText>
                                            <CIcon icon={cilPeople} className="me-2" />
                                            {c.count}
                                        </CCardText>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        );
                    })}
                </CRow>
            </CContainer>
            <AppFooter />
        </>
    );
};

export default Home;
