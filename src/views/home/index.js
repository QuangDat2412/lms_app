/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { useNavigate } from 'react-router-dom';
import { OthersSelector } from 'src/redux/others/slice';
import { Col, Row, Card, Typography } from 'antd';
import { UsergroupDeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Meta } = Card;
const Home = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(courseActions.setFilter(filterForm));
    }, []);
    const options = useSelector(OthersSelector.options);
    const courses = useSelector(courseSelector.courses);
    const filterForm = useSelector(courseSelector.filterForm);
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
            <Card style={{ padding: '20px 70px 10px' }}>
                <Row>
                    <Title level={2}>
                        <strong>Khóa học Tiếng Anh cơ bản</strong>
                    </Title>
                </Row>
                <Row gutter={16}>
                    {courses1.map((c, i) => {
                        return (
                            <Col span={6} key={i}>
                                <Card
                                    onClick={() => {
                                        navigate('/courses/' + c.code, { replace: true });
                                    }}
                                    hoverable
                                    cover={
                                        <div className="cus-box-img thumbnail">
                                            <div className="img">
                                                <img src={c.image} alt="" />
                                            </div>
                                        </div>
                                    }
                                >
                                    <Meta
                                        title={c.name}
                                        description={
                                            <div>
                                                <UsergroupDeleteOutlined />
                                                <span style={{ marginLeft: '5px' }}>{c.count}</span>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Title level={2}>
                        <strong>Khóa học Tiếng Anh nâng cao</strong>
                    </Title>
                </Row>
                <Row gutter={16}>
                    {courses2.map((c, i) => {
                        return (
                            <Col span={6} key={i}>
                                <Card
                                    onClick={() => {
                                        navigate('/courses/' + c.code, { replace: true });
                                    }}
                                    hoverable
                                    cover={
                                        <div className="cus-box-img thumbnail">
                                            <div className="img">
                                                <img src={c.image} alt="" />
                                            </div>
                                        </div>
                                    }
                                >
                                    <Meta
                                        title={c.name}
                                        description={
                                            <div>
                                                <UsergroupDeleteOutlined />
                                                <span style={{ marginLeft: '5px' }}>{c.count}</span>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Card>
        </>
    );
};

export default Home;
