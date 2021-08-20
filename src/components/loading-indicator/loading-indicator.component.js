import React from 'react';
import { Row, Col, Spin } from 'antd';
import clsx from 'clsx';
import './loading-indicator.component.scss';

const LoadingIndicator = ({ fullScreen }) => (
    <Row>
        <Col xs={24} className={clsx('loading-container', fullScreen && 'loading-fullscreen')}>
            <Spin />
        </Col>
    </Row>
);

export default LoadingIndicator;
