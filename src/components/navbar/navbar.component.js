import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { Row, Col, Avatar } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../providers/auth-provider.providers';
import Login from '../login/login.component';
import UserMenu from '../user-menu/user-menu.component';
import CustomButton from '../../custom/button/button.custom';
import CustomInput from '../../custom/input/input.custom';
import CustomDrawer from '../../custom/drawer/drawer.custom';
import CustomPopover from '../../custom/popover/popover.custom';
import './navbar.component.styles.scss';

const Navbar = ({ children }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { signIn, authenticated, userId, role, signOut, isPremium } = useAuth();
    const navbarButtons = [
        {
            name: 'Try Premium',
            onClick: () => console.log('Try Premium clicked'),
            className: 'try-premium-btn',
            wrapper: '',
            wrapperContent: null,
            show: !Boolean(isPremium),
        },
        {
            name: 'Sign In',
            className: '',
            wrapper: CustomPopover,
            wrapperContent: {
                placement: 'bottom',
                trigger: 'click',
                content: <Login />,
            },
            show: !Boolean(authenticated),
        },
        {
            name: 'Sign Out',
            className: 'show-on-mobile',
            wrapper: CustomPopover,
            wrapperContent: {
                placement: 'bottom',
                trigger: 'click',
                content: <Login />,
            },
            show: Boolean(authenticated),
        },
    ];

    /**
     * @description This function is used to return the buttons.
     * @argument inDrawer Boolean Checks whether the buttons are supposed to be rendered inside the drawer.
     * @returns Elements The button elements based on the navbar buttons array.
     */
    const returnNavbarButtons = (inDrawer = false) =>
        navbarButtons.map(
            (button) =>
                button.show &&
                (!inDrawer ? (
                    button.wrapper ? (
                        <button.wrapper
                            key={button.name}
                            placement={button.wrapperContent.placement}
                            trigger={button.wrapperContent.trigger}
                            content={button.wrapperContent.content}
                        >
                            <CustomButton
                                key={button.name}
                                className={button.className}
                                onClick={button.onClick}
                                title={button.name}
                                inDrawer={inDrawer}
                            />
                        </button.wrapper>
                    ) : (
                        <CustomButton
                            key={button.name}
                            className={button.className}
                            onClick={button.onClick}
                            title={button.name}
                            inDrawer={inDrawer}
                        />
                    )
                ) : (
                    <Row key={button.name} className="menu-list">
                        {button.name}
                    </Row>
                )),
        );

    return (
        <Row className="root">
            <Row span={24} className="navbar-panel">
                <Col lg={2} md={3} sm={3} xs={4} className="logo-container">
                    <img src={Logo} alt="Logo" className="logo" />
                </Col>
                <Col md={7} lg={11} xl={10} xs={16} className="search-container">
                    <CustomInput
                        search
                        onSearch={(value) => console.log(value)}
                        label="Search field"
                    />
                </Col>
                <Col xs={3} md={0} sm={4} className="menu-container">
                    <CustomButton
                        className="btn-center"
                        onClick={() => setOpenDrawer(true)}
                        icon={<MenuOutlined />}
                    />
                    <CustomDrawer
                        closable={true}
                        visible={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                    >
                        {returnNavbarButtons(true)}
                    </CustomDrawer>
                </Col>
                <Col xs={0} sm={8} md={12} xl={11} className="button-container">
                    {returnNavbarButtons()}
                    {authenticated && (
                        <CustomPopover placement="bottom" trigger="click" content={<UserMenu />}>
                            <Avatar className="user-avatar" size="large" icon={<UserOutlined />} />
                        </CustomPopover>
                    )}
                </Col>
            </Row>
            {/* <Row className="body">{children}</Row> */}
        </Row>
    );
};

export default Navbar;
