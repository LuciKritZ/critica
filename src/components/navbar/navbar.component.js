/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Row, Col, Avatar } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../providers/auth-provider.providers';
import { useUserInfo } from '../../providers/user.providers';
import Login from '../login/login.component';
import UserMenu from '../user-menu/user-menu.component';
import CustomButton from '../../custom/button/button.custom';
import CustomInput from '../../custom/input/input.custom';
import CustomDrawer from '../../custom/drawer/drawer.custom';
import CustomPopover from '../../custom/popover/popover.custom';
import CustomModal from '../../custom/modal/modal.custom';
import { AppRoute } from '../../utils/router.utils';
import './navbar.component.scss';

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [signInModalStatus, setSignInModalStatus] = useState(false);
    const [userMenuPopoverStatus, setUserMenuPopoverStatus] = useState(false);
    const { authenticated, signOut } = useAuth();
    const { user } = useUserInfo();
    const history = useHistory();
    const navbarButtons = [
        {
            name: 'Try Premium',
            onClick: () => console.log('Try Premium clicked'),
            className: 'try-premium-btn',
            show: !user.isPremium,
        },
        {
            name: 'Sign In',
            className: '',
            onClick: () => setSignInModalStatus(true),
            show: !authenticated,
        },
        {
            name: 'My Profile',
            className: 'show-on-mobile',
            show: Boolean(authenticated),
            onClick: () => history.push(AppRoute.PROFILE),
        },
        {
            name: 'Admin Panel',
            className: 'show-on-mobile',
            show: Boolean(user.isAdmin),
            onClick: () => history.push(AppRoute.ADMIN_PANEL),
        },
        {
            name: 'Sign Out',
            className: 'show-on-mobile',
            show: Boolean(authenticated),
            onClick: signOut,
        },
    ];

    /**
     * @description This function is used to return the buttons.
     * @argument inDrawer
     * Boolean Checks whether the buttons are supposed to be rendered inside the drawer.
     * @returns Elements The button elements based on the navbar buttons array.
     */
    const returnNavbarButtons = (inDrawer = false) =>
        navbarButtons.map(
            (button) =>
                button.show &&
                (!inDrawer ? (
                    <CustomButton
                        key={button.name}
                        className={button.className}
                        onClick={button.onClick}
                        title={button.name}
                        inDrawer={inDrawer}
                    />
                ) : (
                    <Row key={button.name} className="menu-list">
                        {button.name}
                    </Row>
                )),
        );

    return (
        <Row className="root">
            <CustomModal
                centered
                visible={signInModalStatus}
                footer={null}
                onCancel={() => setSignInModalStatus(false)}
            >
                <Login onSignIn={() => setSignInModalStatus(false)} />
            </CustomModal>
            <Row span={24} className="navbar-panel">
                <Col lg={2} md={3} sm={3} xs={4} className="logo-container">
                    <div onClick={() => history.push(AppRoute.HOMEPAGE)}>
                        <img src={Logo} alt="Logo" className="logo" />
                    </div>
                </Col>
                <Col md={7} lg={10} xl={10} xs={16} className="search-container">
                    <CustomInput
                        search
                        onSearch={() => history.push(AppRoute.SEARCH)}
                        label="Search field"
                    />
                </Col>
                <Col xs={4} md={0} sm={5} className="menu-container">
                    <CustomButton
                        className="btn-center"
                        onClick={() => setOpenDrawer(true)}
                        icon={<MenuOutlined />}
                    />
                    <CustomDrawer
                        closable
                        visible={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                        className=""
                    >
                        {returnNavbarButtons(true)}
                    </CustomDrawer>
                </Col>
                <Col xs={0} sm={8} md={14} lg={12} xl={12} className="button-container">
                    {returnNavbarButtons()}
                    {authenticated && (
                        <CustomPopover
                            placement="bottomRight"
                            trigger="click"
                            visible={userMenuPopoverStatus}
                            content={<UserMenu closeMenu={() => setUserMenuPopoverStatus(false)} />}
                            close={() => setUserMenuPopoverStatus(!userMenuPopoverStatus)}
                        >
                            <Avatar
                                className="user-avatar"
                                size="large"
                                icon={
                                    <UserOutlined
                                        onClick={() =>
                                            setUserMenuPopoverStatus(!userMenuPopoverStatus)
                                        }
                                    />
                                }
                            />
                        </CustomPopover>
                    )}
                </Col>
            </Row>
        </Row>
    );
};

export default Navbar;
