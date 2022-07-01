import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CSidebar, CSidebarBrand, CSidebarNav, CImage, CCol } from '@coreui/react';

import { AppSidebarNav } from './AppSidebarNav';

import sygnet from 'src/assets/logo.png';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { OthersAction, OthersSelector } from 'src/redux/others/slice';

// sidebar nav config
import navigation from '../_nav';

const AppSidebar = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector(OthersSelector.sidebarShow);
    return (
        <CSidebar
            position="fixed"
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch(OthersAction.toggleSideBar(visible));
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to="/">
                <CImage className="sidebar-brand-narrow" src={sygnet} height={35} />
                <div lg={9} className="sidebar-brand-full">
                    <CCol className=" d-flex align-items-center justify-content-around">
                        <CImage src={sygnet} height={40} />
                        <h5>LMS APP</h5>
                    </CCol>
                </div>
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
        </CSidebar>
    );
};

export default React.memo(AppSidebar);
