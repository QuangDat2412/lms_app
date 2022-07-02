import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CPopover,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CDropdownHeader,
    CDropdownDivider,
    CAvatar,
    CRow,
    CCol,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilSearch } from '@coreui/icons';
import { AppHeaderDropdown } from './header/index';
import logo from 'src/assets/logo.png';
import da from 'src/assets/default-avatar.png';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { authSelector } from 'src/redux/auth/auth.slice';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AppHeader = () => {
    let navigate = useNavigate();
    const filterForm = { name: '', status: 0 };
    const [filter, setFilter] = useState(filterForm);
    const currentUser = useSelector(authSelector.currentUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(courseActions.searchCourse(filter));
    }, [dispatch, filter]);
    useEffect(() => {
        dispatch(courseActions.getLearningByUserId(currentUser));
    }, [dispatch, currentUser]);
    const courses = useSelector(courseSelector.sCourses);
    const listLearn = useSelector(courseSelector.listLearn);
    return (
        <CHeader position="sticky" style={{ color: '#fff !important' }}>
            <CContainer fluid>
                <CHeaderBrand to="/">
                    <img src={logo} height={48} alt="Logo" />
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <a href="/" style={{ textDecoration: 'none', color: '#000' }}>
                            <h6 className="m-0" style={{ fontWeight: 'bold' }}>
                                Trang chủ
                            </h6>
                        </a>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CPopover
                        content={<RenderItem data={courses} />}
                        placement="bottom"
                        trigger="focus"
                        onHide={() => {
                            setFilter({ name: '' });
                        }}
                    >
                        <CInputGroup className="custom-search">
                            <CInputGroupText id="basic-addon1">
                                <CIcon icon={cilSearch} height={20} alt="Logo" />
                            </CInputGroupText>
                            <CFormInput
                                placeholder="Tìm kiếm khóa học"
                                aria-label="Tìm kiếm khóa học"
                                aria-describedby="basic-addon1"
                                value={filter.name}
                                onChange={(e) => {
                                    setFilter({ name: e.target.value });
                                }}
                            />
                        </CInputGroup>
                    </CPopover>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <CDropdown variant="nav-item">
                        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                            <h6 className="m-0" style={{ fontWeight: 'bold' }}>
                                Khóa học của tôi
                            </h6>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0 custom-dropdown-menu" placement="bottom-end">
                            <CDropdownHeader className="fw-semibold py-2">
                                <span className="m-0" style={{ fontWeight: 'bold' }}>
                                    Khóa học của tôi
                                </span>
                            </CDropdownHeader>
                            <hr className="m-0" />
                            <CTable className="mb-0">
                                <CTableBody>
                                    {listLearn.length > 0 ? (
                                        listLearn.map((l, li) => {
                                            return (
                                                <CTableRow
                                                    key={li}
                                                    onClick={() => {
                                                        navigate('/courses/' + l.courseId.code, { replace: true });
                                                    }}
                                                >
                                                    <CTableDataCell className="btn-lesson px-4 cus-td">
                                                        <CRow>
                                                            <CCol lg="4">
                                                                <div className="cus-box-img thumbnail" style={{ borderRadius: '8px' }}>
                                                                    <div className="img">
                                                                        <img src={l.courseId.image} alt="" />
                                                                    </div>
                                                                </div>
                                                            </CCol>
                                                            <CCol lg="8" className="d-flex align-items-center">
                                                                <span style={{ fontWeight: '500' }}>{l.courseId.name}</span>
                                                            </CCol>
                                                        </CRow>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            );
                                        })
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell className="btn-lesson cus-td">Bạn chưa đăng ký khóa học nào.</CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                            </CTable>
                        </CDropdownMenu>
                    </CDropdown>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    {currentUser?._id ? (
                        <AppHeaderDropdown />
                    ) : (
                        <div
                            style={{ width: '40px' }}
                            onClick={() => {
                                navigate('/login', { replace: true });
                            }}
                        >
                            <div className="box-img avatar" style={{ borderRadius: '8px' }}>
                                <div className="img">
                                    <img src={da} alt="" />
                                </div>
                            </div>
                        </div>
                    )}
                </CHeaderNav>
            </CContainer>
        </CHeader>
    );
};
// eslint-disable-next-line react/prop-types
const RenderItem = ({ data }) => {
    let navigate = useNavigate();
    let datas = data || [];
    return (
        <CTable className="mb-0">
            <CTableBody>
                <CTableRow>
                    <CTableDataCell className="btn-lesson px-2 cus-td">
                        <span style={{ fontWeight: '500' }}>Kết quả tìm kiếm: </span>
                    </CTableDataCell>
                </CTableRow>
                <hr className="m-0" />
                {datas.length > 0 ? (
                    datas.map((l, li) => {
                        return (
                            <CTableRow
                                key={li}
                                onClick={() => {
                                    navigate('/courses/' + l.code, { replace: true });
                                }}
                            >
                                <CTableDataCell className="btn-lesson px-2 fix-img cus-td">
                                    <CAvatar src={l?.image} size="md" />{' '}
                                    <span className="ms-2" style={{ fontWeight: 'bold' }}>
                                        {l.name}
                                    </span>
                                </CTableDataCell>
                            </CTableRow>
                        );
                    })
                ) : (
                    <CTableRow>
                        <CTableDataCell className="btn-lesson px-2 py-4 d-flex justify-content-center cus-td">
                            <span style={{ fontWeight: '400', display: 'block' }}>Không tìm thấy khóa học.</span>
                        </CTableDataCell>
                    </CTableRow>
                )}
            </CTableBody>
        </CTable>
    );
};
export default AppHeader;
