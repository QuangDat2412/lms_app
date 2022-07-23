import React, { useState, useEffect } from 'react';
import { CCol, CRow, CContainer, CCard, CCardText, CCardTitle, CCardBody } from '@coreui/react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import { useNavigate } from 'react-router-dom';
import banner from 'src/assets/banner.webp';
import { authSelector } from 'src/redux/auth/auth.slice';

const Profile = () => {
    let navigate = useNavigate();
    const filterForm = { name: '', status: 0 };
    const dispatch = useDispatch();
    const currentUser = useSelector(authSelector.currentUser);
    useEffect(() => {
        dispatch(courseActions.getLearningByUserId(currentUser));
    }, [dispatch, currentUser]);
    const listLearn = useSelector(courseSelector.listLearn);

    return (
        <>
            <AppHeader />
            <CContainer className=" fluid">
                <div style={{ backgroundImage: 'url(' + banner + ')' }} className="banner">
                    <div className="avatar-info">
                        <div className="Profile_user-avatar__y8fSV">
                            <img className="Profile_avatar__0ZkLo" src={currentUser.avatar} alt={currentUser.fullName} />
                        </div>
                        <div className="Profile_user-name__xIJlY">
                            <span>{currentUser.fullName}</span>
                        </div>
                    </div>
                </div>
                <CRow className="box-content">
                    <CCol lg="12">
                        <div className="box-wrapper">
                            <h4 className="text-header">Các khóa học đã tham gia</h4>
                            <div>
                                {listLearn.map((l, i) => {
                                    return (
                                        <div className="wrapper" key={i}>
                                            <a className="thumbnail" href={'/courses/' + l.courseId.code}>
                                                <img src={l.courseId.image} alt="" />
                                            </a>
                                            <div className="info">
                                                <h3>
                                                    <a href={'/courses/' + l.courseId.code}>{l.courseId.name}</a>
                                                </h3>
                                                <span dangerouslySetInnerHTML={{ __html: l.courseId.description }} className="wrapword"></span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>
            <AppFooter />
        </>
    );
};

export default Profile;
