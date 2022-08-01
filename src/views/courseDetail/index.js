import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppHeaderDropdown } from '../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { authSelector } from 'src/redux/auth/auth.slice';
import {
    CCol,
    CRow,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilClock, cilBook, cilMovie } from '@coreui/icons';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';

import './index.scss';
const CourseDetail = () => {
    const header = useRef();
    const [isRegister, setIsRegister] = useState(false);
    let navigate = useNavigate();
    const currentLocation = useLocation().pathname;
    const code = currentLocation.split('/')[2];
    const dispatch = useDispatch();
    const course = useSelector(courseSelector.course);
    const learn = useSelector(courseSelector.learn);
    const currentUser = useSelector(authSelector.currentUser);
    const formRegister = { userId: currentUser?._id, courseId: course?._id };
    useEffect(() => {
        if (code) {
            dispatch(courseActions.getCourseByCode({ code: code }));
        }
    }, [dispatch, code]);
    useEffect(() => {
        debugger;
        dispatch(courseActions.getLearning({ userId: currentUser?._id, courseId: course?._id }));
    }, [dispatch, course, currentUser]);
    useEffect(() => {
        setIsRegister(learn?._id);
    }, [learn, course]);
    let listTopics = course.listTopics || [];
    let total = 0;
    listTopics = listTopics.map((t, i) => {
        let ll = t.listLessons.map((l, j) => ({ ...l, sort: j + 1 + total }));
        total = total + t.listLessons.length;
        return { ...t, listLessons: ll };
    });

    const lessonCount = listTopics.reduce((p, n) => {
        return p + n.listLessons.length;
    }, 0);
    const times = listTopics.reduce((p, n) => {
        let ll = n.listLessons;
        let t = ll.reduce((p, n) => {
            return p + n?.time || 0;
        }, 0);
        return p + t;
    }, 0);
    function secondsToHms(d, type) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
        var hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) + ' giờ' : '';
        var mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) + ' phút' : '';
        var sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) + ' giây' : '';
        if (type === 'hm') {
            return hDisplay + ' ' + mDisplay;
        } else if (type === 'ms') {
            return (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s);
        } else {
            return hDisplay + ' ' + mDisplay + ' ' + sDisplay;
        }
    }
    const registerCourse = () => {
        if (currentUser?._id) {
            dispatch(courseActions.registerCourse(formRegister));
            goLearning();
        } else {
            navigate('/login', { replace: true });
        }
    };
    const goLearning = () => {
        navigate('/learning/' + code, { replace: true });
    };
    return (
        <>
            <CRow xs={{ gutter: 0 }} className="box">
                <AppHeader />
                <CCol
                    lg="8"
                    className="course-detail"
                    xs="12"
                    style={{
                        height: `calc(100vh - 112px )`,
                        overflowY: 'overlay',
                        padding: '20px 50px 0',
                    }}
                >
                    <CRow xs={{ gutterX: 2, gutterY: 2 }}>
                        <CCol lg={12} className="mb-2">
                            <h2>
                                <strong>{course.name}</strong>
                            </h2>
                            <span dangerouslySetInnerHTML={{ __html: course.description }}></span>
                        </CCol>
                        <CCol lg={12} className="mb-1">
                            <h4>
                                <strong>Nội dung khóa học</strong>
                                <ul className="count mt-3">
                                    <li>
                                        <strong>{course.listTopics?.length} </strong> chương
                                    </li>
                                    <li className="space">•</li>
                                    <li>
                                        <strong>{lessonCount} </strong> bài học
                                    </li>
                                    <li className="space">•</li>
                                    <li>
                                        <span>
                                            Thời lượng: <strong>{secondsToHms(times)}</strong>
                                        </span>
                                    </li>
                                </ul>
                            </h4>
                        </CCol>
                        <CCol lg={12}>
                            <CAccordion activeItemKey={0} alwaysOpen>
                                {listTopics.map((t, i) => {
                                    return (
                                        <CAccordionItem itemKey={i} key={i}>
                                            <CAccordionHeader>
                                                <strong style={{ fontSize: '16px', flex: 1 }}>{`${i + 1}. ${t.name}`}</strong>
                                                <span style={{ fontSize: '16px', marginRight: '10px' }}>{t.listLessons.length + ' bài học'}</span>
                                            </CAccordionHeader>
                                            <CAccordionBody>
                                                <CTable className="mb-0">
                                                    <CTableBody>
                                                        {t.listLessons.map((l, i) => {
                                                            return (
                                                                <CTableRow key={i}>
                                                                    <CTableDataCell className="btn-lesson">{l.sort + '. ' + l.name}</CTableDataCell>
                                                                    <CTableDataCell className="d-flex justify-content-end">
                                                                        {secondsToHms(l.time, 'ms')}
                                                                    </CTableDataCell>
                                                                </CTableRow>
                                                            );
                                                        })}
                                                    </CTableBody>
                                                </CTable>
                                            </CAccordionBody>
                                        </CAccordionItem>
                                    );
                                })}
                            </CAccordion>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol
                    lg="4"
                    xs="12"
                    style={{
                        marginTop: `${header.current?.clientHeight}px`,
                        height: `calc(100vh - ${header.current?.clientHeight}px )`,
                        overflowY: 'overlay',
                        overflowX: 'hidden',
                        padding: '20px 0  0',
                    }}
                >
                    <CRow>
                        <CCol lg="12">
                            <div style={{ padding: '0 50px' }}>
                                <div className="player-doc">
                                    <div className="player">
                                        <img width="100%" height="100%" src={course.image} alt="" />
                                    </div>
                                </div>
                            </div>
                        </CCol>
                        <CCol lg="12" className="d-flex justify-content-center mt-3">
                            <h2 style={{ color: 'orange' }}>Miễn Phí</h2>
                        </CCol>
                        <CCol lg="12" className="d-flex justify-content-center mt-3">
                            {isRegister ? (
                                <div className="px-4 py-2 btn-action" onClick={goLearning}>
                                    Học tiếp
                                </div>
                            ) : (
                                <div className="px-4 py-2 btn-action" onClick={registerCourse}>
                                    Đăng ký
                                </div>
                            )}
                        </CCol>
                        <CCol lg="12" className="mt-2">
                            <CRow className="align-items-center">
                                <CCol lg="3"></CCol>
                                <CCol lg="1">
                                    <CIcon icon={cilBook} />
                                </CCol>
                                <CCol lg="8">{course.type?.name}</CCol>
                                <CCol lg="3"></CCol>

                                <CCol lg="1">
                                    <CIcon icon={cilMovie} />
                                </CCol>
                                <CCol lg="8">{'Tổng số ' + lessonCount + ' bài học'}</CCol>
                                <CCol lg="3"></CCol>

                                <CCol lg="1">
                                    <CIcon icon={cilClock} />
                                </CCol>
                                <CCol lg="8">{'Thời lượng ' + secondsToHms(times)}</CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </>
    );
};

export default CourseDetail;
