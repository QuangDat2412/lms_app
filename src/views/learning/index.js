/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
    CCol,
    CRow,
    CAccordionItem,
    CAccordionHeader,
    CTable,
    CAccordion,
    CAccordionBody,
    CTableBody,
    CTableRow,
    CTableDataCell,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { useLocation } from 'react-router-dom';
import clock from '../../assets/icon-lesson/Icon.svg';
import './index.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Learning = () => {
    const currentLocation = useLocation().pathname;
    const [lesson, setLesson] = useState({});
    const code = currentLocation.split('/')[2];
    const dispatch = useDispatch();
    const course = useSelector(courseSelector.course);
    useEffect(() => {
        if (code) {
            dispatch(courseActions.getCourseByCode({ code: code }));
        }
    }, [dispatch, code]);

    let listTopics = course.listTopics || [];
    let total = 0;
    listTopics = listTopics.map((t, i) => {
        let ll = t.listLessons.map((l, j) => ({ ...l, sort: j + 1 + total }));
        total = total + t.listLessons.length;
        return { ...t, listLessons: ll };
    });
    useEffect(() => {
        setLesson({ ...listTopics[0]?.listLessons[0], topicIdx: 0, lessonIdx: 0 });
    }, [course]);
    const lessonCount = listTopics.reduce((p, n) => {
        return p + n.listLessons.length;
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
            return mDisplay + ' ' + sDisplay + '' + sDisplay;
        }
    }
    const header = useRef();
    const video = useRef();
    const headerC = useRef();
    const [headerH, setHeaderH] = useState(0);
    useEffect(() => {
        setHeaderH(header.current.clientHeight + headerC.current.clientHeight);
    }, [header.current?.clientHeight, headerH.current?.clientHeight]);
    return (
        <>
            <CRow xs={{ gutter: 0 }} className="box">
                <CCol ref={header} className="nav-bar-lesson">
                    <div>{course?.name}</div>
                    <span>
                        <CircularProgressbar value={0.55} maxValue={1} text={`${55}%`} />
                        <strong>{'0/' + lessonCount}</strong>
                        {' bài học'}
                    </span>
                </CCol>
                <CCol
                    lg="9"
                    xs="12"
                    style={{
                        marginTop: `${header.current?.clientHeight}px`,
                        height: `calc(100vh - ${header.current?.clientHeight}px )`,
                        overflowY: 'overlay',
                        borderRight: '1px solid #ccc',
                    }}
                >
                    <div className="box-player-doc" style={{ backgroundColor: ' #000' }}>
                        <div>
                            <div className="player-doc">
                                <div className="player">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        ref={video}
                                        src={lesson?.url}
                                        title={lesson?.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-player-doc mt-4" style={{ minHeight: '500px' }}>
                        <div>
                            <h4>
                                <strong>{lesson?.name}</strong>
                            </h4>
                            <div className="mt-4">
                                <span dangerouslySetInnerHTML={{ __html: lesson.description }}></span>
                            </div>
                        </div>
                    </div>
                </CCol>
                <CCol className="box-controls" lg="3" style={{ marginTop: `${header.current?.clientHeight}px` }}>
                    <div className="header" ref={headerC}>
                        <h5>Nội dung khóa học</h5>
                    </div>
                    <CAccordion activeItemKey={0} style={{ height: `calc(100vh - ${headerH}px )` }}>
                        {listTopics.map((t, ti) => {
                            return (
                                <CAccordionItem itemKey={ti} key={ti}>
                                    <CAccordionHeader>
                                        <div className="d-flex flex-column">
                                            <strong style={{ fontSize: '16px', flex: 1 }}>{`${ti + 1}. ${t.name}`}</strong>
                                            <span style={{ fontSize: '16px', marginRight: '10px' }}>{'0/' + t.listLessons.length}</span>
                                        </div>
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <CTable className="mb-0">
                                            <CTableBody>
                                                {t.listLessons.map((l, li) => {
                                                    return (
                                                        <CTableRow key={li}>
                                                            <CTableDataCell
                                                                className={
                                                                    'btn-lesson ' +
                                                                    (lesson.topicIdx === ti && lesson.lessonIdx === li ? 'active' : '')
                                                                }
                                                                onClick={() => {
                                                                    setLesson({ ...l, topicIdx: ti, lessonIdx: li });
                                                                }}
                                                            >
                                                                <span>{l.sort + '. ' + l.name}</span>
                                                                <div>
                                                                    <small className="d-flex align-items-center">
                                                                        <img src={clock} alt="clock" className="me-2" />
                                                                        {secondsToHms(l.time, 'ms')}
                                                                    </small>
                                                                </div>
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
        </>
    );
};

export default Learning;
