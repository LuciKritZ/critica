import React from 'react';
import { Row, Col, Spin } from 'antd';

const LoadingIndicator = () => (
    <Row>
        <Col xs={24}>
            <Spin />
        </Col>
    </Row>
);

export default LoadingIndicator;
