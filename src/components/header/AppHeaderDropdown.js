import React from 'react';
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { authSelector, authActions } from 'src/redux/auth/auth.slice';
import { useSelector, useDispatch } from 'react-redux';

const AppHeaderDropdown = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(authSelector.currentUser);
    const logout = (e) => {
        e.preventDefault();
        dispatch(authActions.logout());
    };
    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <CAvatar src={currentUser?.avatar} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-light fw-semibold py-2">{currentUser?.fullName}</CDropdownHeader>
                <CDropdownItem href="/profile">
                    <CIcon icon={cilUser} className="me-2" />
                    Trang cá nhân
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">
                    <CIcon icon={cilSettings} className="me-2" />
                    Cài đặt
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem
                    href="#"
                    onClick={(e) => {
                        logout(e);
                    }}
                >
                    <CIcon icon={cilLockLocked} className="me-2" />
                    Đăng xuất
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
