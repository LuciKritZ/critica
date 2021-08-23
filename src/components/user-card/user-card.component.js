import React from 'react';
import { Card, Row } from 'antd';
import './user-card.component.scss';

const UserCard = ({ children, title, actions }) => (
    <Row className="card-item-grid">
        <Card actions={actions} title={title} className="user-card-container">
            {children}
        </Card>
    </Row>
);

export default UserCard;
