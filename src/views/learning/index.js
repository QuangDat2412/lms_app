/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { commentActions, commentSelector } from 'src/redux/comment/comment.slice';
import { useLocation } from 'react-router-dom';
import clock from '../../assets/icon-lesson/Icon.svg';
import doneImg from '../../assets/done.png';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { authSelector } from 'src/redux/auth/auth.slice';
import VideoPlayer from './video';
import CIcon from '@coreui/icons-react';
import { cilChevronLeft } from '@coreui/icons';
import socketIOClient from 'socket.io-client';
const host = 'http://localhost:2412';
const { TextArea } = Input;

const Learning = () => {
    const currentLocation = useLocation().pathname;
    let navigate = useNavigate();
    const [get, setGet] = useState(0);
    const [lesson, setLesson] = useState({});
    const [tCount, setTCount] = useState([]);
    const dispatch = useDispatch();
    const course = useSelector(courseSelector.course);
    const learn = useSelector(courseSelector.learn);
    const currentUser = useSelector(authSelector.currentUser);
    const socketRef = useRef();

    useEffect(() => {
        const code = currentLocation.split('/')[2];
        if (code) {
            dispatch(courseActions.getCourseByCode({ code: code }));
        }
        socketRef.current = socketIOClient.connect(host);
        socketRef.current.on('getMessage', (users) => {
            setGet((p) => p + 1);
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    useEffect(() => {
        if (!currentUser?._id && course.code) {
            navigate('/courses/' + course.code, { replace: true });
        }
        dispatch(courseActions.getLearning({ userId: currentUser?._id, courseId: course?._id }));
        if (currentUser._id && course._id) socketRef.current.emit('addUser', { userId: currentUser._id, courseId: course._id });
    }, [currentUser, navigate, course, dispatch]);

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
    useEffect(() => {
        if (learn._id) {
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
        }
    }, [learn]);

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

    const endVideo = useCallback(() => {
        let obj = learn?.listLessonId?.find((x) => x === lesson._id);
        if (!obj) {
            dispatch(courseActions.done({ userId: currentUser._id, courseId: course._id, lessonId: lesson._id }));
            dispatch(courseActions.getLearning({ userId: currentUser._id, courseId: course._id }));
        }
    }, [currentUser, course, lesson]);
    return (
        <>
            <CRow xs={{ gutter: 0 }} className="box">
                <CCol className="nav-bar-lesson">
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
                            text={`${(
                                (tCount.reduce((t, n) => {
                                    return t + n;
                                }, 0) /
                                    lessonCount) *
                                100
                            ).toFixed(2)}%`}
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
                        marginTop: `55px`,
                        height: `calc(100vh - 55px )`,
                        overflowY: 'overlay',
                        borderRight: '1px solid #ccc',
                    }}
                >
                    <div className="box-player-doc" style={{ backgroundColor: ' #000' }}>
                        <div className="player-doc">
                            <div className="player">
                                <VideoPlayer lesson={lesson} endVideo={endVideo} />
                            </div>
                        </div>
                    </div>
                    <div className="box-player-doc mt-4">
                        <div style={{ width: '80%' }}>
                            <h4>
                                <strong>{lesson?.name}</strong>
                            </h4>
                            <div className="mt-4">
                                <span dangerouslySetInnerHTML={{ __html: lesson.description }}></span>
                            </div>
                            <CommentBox currentUser={currentUser} course={course} socketRef={socketRef} get={get} />
                        </div>
                    </div>
                </CCol>
                <CCol className="box-controls" lg="3" style={{ marginTop: `55px` }}>
                    <div className="header">
                        <h5 className="m-0">Nội dung khóa học</h5>
                    </div>
                    <CAccordion activeItemKey={1} style={{ height: `calc(100vh - 119px )` }} alwaysOpen>
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

const CommentList = ({ comments }) => {
    let _comment = comments.map((c) => {
        return {
            author: c.userId.fullName,
            avatar: c.userId.avatar,
            content: <p>{c.text}</p>,
            datetime: TimeAgo(c.createdAt),
        };
    });
    return (
        <List dataSource={_comment} header={`${_comment.length} bình luận`} itemLayout="horizontal" renderItem={(props) => <Comment {...props} />} />
    );
};

const CommentBox = ({ currentUser, course, socketRef, get }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(commentActions.getComment({ courseId: course?._id }));
    }, [dispatch, get, course]);
    const comments = useSelector(commentSelector.comments);
    return (
        <>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={<Avatar src={currentUser.avatar} alt="Han Solo" />}
                content={<Editor currentUser={currentUser} course={course} socketRef={socketRef} />}
            />
        </>
    );
};

const Editor = ({ currentUser, course, socketRef }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!comment) return;
        let model = { userId: currentUser._id, courseId: course._id, text: comment };
        dispatch(commentActions.saveComment(model));
        socketRef.current.emit('sendMessage', { courseId: course._id });
        setComment('');
    };

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };
    return (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={handleChangeComment} value={comment} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" onClick={handleSubmit} type="primary">
                    Thêm bình luận
                </Button>
            </Form.Item>
        </>
    );
};
export default Learning;
const TimeAgo = (value) => {
    if (value) {
        const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
        if (seconds <= 60) return 'gần đây';

        const intervals = {
            year: 31536000,

            month: 2592000,

            week: 604800,

            day: 86400,

            hour: 3600,

            minute: 60,

            second: 1,
        };
        if (seconds > intervals.minute && seconds < intervals.hour) {
            return Math.floor(seconds / intervals.minute) + ' phút trước';
        }
        if (seconds > intervals.hour && seconds < intervals.day) {
            return Math.floor(seconds / intervals.hour) + ' giờ trước';
        }
        if (seconds > intervals.day && seconds < intervals.week) {
            return Math.floor(seconds / intervals.day) + ' ngày trước';
        } else {
            return new Date(value).toLocaleString().split(',')[0];
        }
    }
    return value;
};
