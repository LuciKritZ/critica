/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Row, Col, Avatar, List } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../providers/auth-provider.providers';
import { useUserInfo } from '../../providers/user.providers';
import UserMenu from '../user-menu/user-menu.component';
import CustomButton from '../../custom/button/button.custom';
import CustomInput from '../../custom/input/input.custom';
import CustomDrawer from '../../custom/drawer/drawer.custom';
import CustomPopover from '../../custom/popover/popover.custom';
import { AppRoute } from '../../utils/router.utils';
import './navbar.component.scss';
import LoginModalComponent from '../loginModal/loginModal.component';

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [signInModalStatus, setSignInModalStatus] = useState(false);
    const [userMenuPopoverStatus, setUserMenuPopoverStatus] = useState(false);
    const { authenticated, signOut, image } = useAuth();
    const { user } = useUserInfo();
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const redirectToPremium = () => {
        if (authenticated) {
            history.push(AppRoute.PAYMENT);
        } else {
            setSignInModalStatus(true);
        }
    };
    const searchRedirect = (event) => {
        if (event) {
            history.push(`${AppRoute.SEARCH}?search=${event}`);
        }
    };
    const navbarButtons = [
        {
            name: 'Try Premium',
            onClick: () => redirectToPremium(),
            className: 'try-premium-btn',
            show: !user.userDetails?.isPremium,
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
            name: 'Book Mark',
            className: 'show-on-mobile',
            show: authenticated,
            onClick: () => history.push(AppRoute.BOOKMARKS),
        },
        {
            name: 'Completed Books',
            className: 'show-on-mobile',
            show: authenticated,
            onClick: () => history.push(AppRoute.MY_BOOKS),
        },
        {
            name: 'Sign Out',
            className: 'show-on-mobile',
            show: Boolean(authenticated),
            onClick: () => {
                signOut();
                if (
                    pathname === AppRoute.PROFILE ||
                    pathname === AppRoute.ADMIN_PANEL ||
                    pathname === AppRoute.BOOKMARKS ||
                    pathname === AppRoute.PAYMENT ||
                    pathname === AppRoute.MY_BOOKS
                ) {
                    history.push(AppRoute.HOMEPAGE);
                }
            },
        },
    ];

    /**
     * @description This function is used to return the buttons.
     * @argument inDrawer
     * Boolean Checks whether the buttons are supposed to be rendered inside the drawer.
     * @returns Elements The button elements based on the navbar buttons array.
     */
    const returnNavbarButtons = (inDrawer = false) =>
        !inDrawer ? (
            navbarButtons.map(
                (button) =>
                    button.show && (
                        <CustomButton
                            key={button.name}
                            className={button.className}
                            onClick={button.onClick}
                            title={button.name}
                            inDrawer={inDrawer}
                        />
                    ),
            )
        ) : (
            <Row>
                <List
                    itemLayout="horizontal"
                    dataSource={navbarButtons}
                    renderItem={(option) =>
                        option.show && (
                            <Col
                                xs={24}
                                onClick={() => {
                                    option.onClick();
                                    setOpenDrawer(false);
                                }}
                                className="list-option"
                            >
                                <List.Item>
                                    <List.Item.Meta
                                        className="option-container"
                                        title={option.name}
                                    />
                                </List.Item>
                            </Col>
                        )
                    }
                />
            </Row>
        );

    return (
        <Row className="root">
            <LoginModalComponent
                signInModalStatus={signInModalStatus}
                setSignInModalStatus={setSignInModalStatus}
            />
            <Row span={24} className="navbar-panel">
                <Col lg={5} md={3} sm={3} xs={4} className="logo-container">
                    <div className="logo-title" onClick={() => history.push(AppRoute.HOMEPAGE)}>
                        <img src={Logo} alt="Logo" className="logo" />
                        <span className="company-title">Cr??tica</span>
                    </div>
                </Col>
                <Col md={7} lg={10} xl={10} xs={16} className="search-container">
                    <CustomInput
                        search
                        onSearch={(event) => searchRedirect(event)}
                        label="Search Books"
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
                <Col xs={0} sm={8} md={14} lg={9} xl={9} className="button-container">
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
                                className={image ? 'user-image' : 'user-avatar'}
                                size="large"
                                src={
                                    <div
                                        onClick={() =>
                                            setUserMenuPopoverStatus(!userMenuPopoverStatus)
                                        }
                                    >
                                        <img src={image} alt="User" />
                                    </div>
                                }
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
