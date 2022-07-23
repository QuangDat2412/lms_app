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
import doneImg from '../../assets/done.png';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { authSelector } from 'src/redux/auth/auth.slice';
import ReactHlsPlayer from 'react-hls-player';
import { DOMAIN } from '../../constants/api';
import CIcon from '@coreui/icons-react';
import { cilChevronLeft } from '@coreui/icons';
const Learning = () => {
    const currentLocation = useLocation().pathname;
    let navigate = useNavigate();

    const [lesson, setLesson] = useState({});
    const [tCount, setTCount] = useState([]);
    const code = currentLocation.split('/')[2];
    const dispatch = useDispatch();
    const course = useSelector(courseSelector.course);
    const learn = useSelector(courseSelector.learn);
    const currentUser = useSelector(authSelector.currentUser);

    useEffect(() => {
        if (!currentUser?._id && course.code) {
            navigate('/courses/' + course.code, { replace: true });
        }
    }, [currentUser, navigate, course]);
    useEffect(() => {
        if (code) {
            dispatch(courseActions.getCourseByCode({ code: code }));
        }
    }, [dispatch, code]);
    useEffect(() => {
        dispatch(courseActions.getLearning({ userId: currentUser?._id, courseId: course?._id }));
    }, [dispatch, course, currentUser]);
    let listTopics = course.listTopics || [];
    let total = 0;
    listTopics = listTopics.map((t, i) => {
        let ll = t.listLessons.map((l, j) => ({ ...l, sort: j + 1 + total }));
        total = total + t.listLessons.length;
        return { ...t, listLessons: ll };
    });
    useEffect(() => {
        let listId = learn?.listLessonId || [];
        let lessonIdx = -1;
        setTCount([]);
        let topicIdx = listTopics.findIndex((t, i) => {
            lessonIdx = t.listLessons.findIndex((l) => l._id === listId[listId.length - 1]);
            let count;
            if (lessonIdx >= 0) count = lessonIdx + 1;
            setTCount((p) => {
                return [...p, count || 0];
            });
            return lessonIdx >= 0;
        });

        if (lessonIdx === listTopics[topicIdx]?.listLessons.length) {
            if (topicIdx === listTopics.length) {
                topicIdx = 0;
                lessonIdx = 0;
            } else {
                topicIdx = topicIdx + 1;
                lessonIdx = 0;
            }
        } else {
            if (!(topicIdx >= 0)) topicIdx = 0;
            if (!(lessonIdx >= 0)) {
                lessonIdx = 0;
            } else {
                lessonIdx = lessonIdx + 1;
            }
        }
        setLesson({ ...listTopics[topicIdx]?.listLessons[lessonIdx], topicIdx: topicIdx, lessonIdx: lessonIdx });
    }, [course, learn]);
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
    const headerC = useRef();
    const [headerH, setHeaderH] = useState(0);
    useEffect(() => {
        setHeaderH(header.current.clientHeight + headerC.current.clientHeight);
    }, [header.current?.clientHeight, headerH.current?.clientHeight]);
    const done = () => {
        dispatch(courseActions.done({ userId: currentUser._id, courseId: course._id, lessonId: lesson._id }));
        dispatch(courseActions.getLearning({ userId: currentUser._id, courseId: course._id }));
    };
    return (
        <>
            <CRow xs={{ gutter: 0 }} className="box">
                <CCol ref={header} className="nav-bar-lesson">
                    <div>
                        <a href="/" style={{ textDecoration: 'none', color: '#fff' }}>
                            <CIcon icon={cilChevronLeft} />
                        </a>
                        {course?.name}
                    </div>
                    <span>
                        <CircularProgressbar
                            value={
                                tCount.reduce((t, n) => {
                                    return t + n;
                                }, 0) / lessonCount
                            }
                            maxValue={1}
                            text={`${
                                (tCount.reduce((t, n) => {
                                    return t + n;
                                }, 0) /
                                    lessonCount) *
                                100
                            }%`}
                        />
                        <strong>
                            {tCount.reduce((t, n) => {
                                return t + n;
                            }, 0) +
                                '/' +
                                lessonCount}
                        </strong>
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
                        <div className="player-doc">
                            <div className="player">
                                <ReactHlsPlayer
                                    onEnded={(a) => {
                                        debugger;
                                        done();
                                    }}
                                    src={DOMAIN + lesson.url}
                                    id={lesson?.name}
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            </div>
                        </div>
                    </div>
                    <div className="box-player-doc mt-4" style={{ minHeight: '500px' }}>
                        <div style={{ width: '80%' }}>
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
                    <CAccordion activeItemKey={1} style={{ height: `calc(100vh - ${headerH}px )` }} alwaysOpen>
                        {listTopics.map((t, ti) => {
                            return (
                                <CAccordionItem itemKey={ti + 1} key={ti}>
                                    <CAccordionHeader>
                                        <div className="d-flex flex-column">
                                            <strong style={{ fontSize: '16px', flex: 1 }}>{`${ti + 1}. ${t.name}`}</strong>
                                            <span style={{ fontSize: '16px', marginRight: '10px' }}>{`${tCount[ti] || 0}/${
                                                t.listLessons.length
                                            }`}</span>
                                        </div>
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <CTable className="mb-0">
                                            <CTableBody>
                                                {t?.listLessons.map((l, li) => {
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
                                                                style={{ position: 'relative' }}
                                                            >
                                                                <span>{l.sort + '. ' + l.name}</span>
                                                                <div>
                                                                    <small className="d-flex align-items-center">
                                                                        <img src={clock} alt="clock" className="me-2" />
                                                                        {secondsToHms(l.time, 'ms')}
                                                                    </small>
                                                                </div>
                                                                {learn?.listLessonId?.find((x) => x === l._id) && (
                                                                    <img
                                                                        src={doneImg}
                                                                        alt="done"
                                                                        className="me-2"
                                                                        style={{ position: 'absolute', right: '10px', top: '50%' }}
                                                                    />
                                                                )}
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
