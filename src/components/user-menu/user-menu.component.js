import React from 'react';
import { Row, Col, List } from 'antd';
import { LogoutOutlined, UserSwitchOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/auth-provider.providers';
import { useUserInfo } from '../../providers/user.providers';
import { AppRoute } from '../../utils/router.utils';
import './user-menu.component.scss';

const UserMenu = ({ closeMenu }) => {
    const { signOut, authenticated } = useAuth();
    const { user } = useUserInfo();
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;

    const options = [
        {
            title: 'My Profile',
            avatar: <UserOutlined size="small" />,
            onClick: () => {
                closeMenu();
                history.push(AppRoute.PROFILE);
            },
            show: true,
        },
        {
            title: 'Admin Panel',
            avatar: <UserSwitchOutlined size="small" />,
            onClick: () => {
                closeMenu();
                history.push(AppRoute.ADMIN_PANEL);
            },
            show: Boolean(user.isAdmin),
        },
        {
            title: 'Book Marks',
            avatar: <UserSwitchOutlined size="small" />,
            onClick: () => {
                closeMenu();
                history.push(AppRoute.BOOKMARKS);
            },
            show: authenticated,
        },
        {
            title: 'Book Completed',
            avatar: <UserSwitchOutlined size="small" />,
            onClick: () => {
                closeMenu();
                history.push(AppRoute.MY_BOOKS);
            },
            show: authenticated,
        },
        {
            title: 'Sign Out',
            avatar: <LogoutOutlined size="small" />,
            onClick: () => {
                signOut();
                if (pathname === AppRoute.PROFILE 
                    || pathname === AppRoute.ADMIN_PANEL
                    || pathname === AppRoute.BOOKMARKS
                    || pathname === AppRoute.PAYMENT
                    || pathname === AppRoute.MY_BOOKS) {
                    history.push(AppRoute.HOMEPAGE);
                }
            },
            show: true,
        },
    ];

    return (
        <Row>
            <List
                itemLayout="horizontal"
                dataSource={options}
                renderItem={(option) =>
                    option.show && (
                        <Col xs={24} onClick={option.onClick} className="list-option">
                            <List.Item>
                                <List.Item.Meta
                                    className="option-container"
                                    avatar={option.avatar}
                                    title={option.title}
                                />
                            </List.Item>
                        </Col>
                    )
                }
            />
        </Row>
    );
};

export default UserMenu;
