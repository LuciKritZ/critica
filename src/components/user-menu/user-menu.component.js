import React from 'react';
import { Row, Col, List, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/auth-provider.providers';
import { AppRoute } from '../../utils/router.utils';
import './user-menu.component.styles.scss';

const UserMenu = () => {
    const { signOut } = useAuth();
    const history = useHistory();

    const options = [
        {
            title: 'My Profile',
            avatar: (
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            ),
            onClick: () => history.push(AppRoute.PROFILE),
        },
        {
            title: 'Sign Out',
            avatar: <LogoutOutlined size="small" />,
            onClick: signOut,
        },
    ];

    return (
        <Row>
            <List
                itemLayout="horizontal"
                dataSource={options}
                renderItem={(option) => (
                    <Col xs={24} onClick={option.onClick} className="list-option">
                        <List.Item>
                            <List.Item.Meta
                                className="option-container"
                                avatar={option.avatar}
                                title={option.title}
                            />
                        </List.Item>
                    </Col>
                )}
            />
        </Row>
    );
};

export default UserMenu;
