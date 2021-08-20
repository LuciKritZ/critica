import React from 'react';
import Navbar from './components/navbar/navbar.component';
import AppRouter from './routers/app.router';
import 'antd/dist/antd.min.css';
import { Row, Col } from 'antd';

const App = () => (
    <>
        <Navbar />
        <Row>
            <Col className="app-body" xs={24}>
                <AppRouter />
            </Col>
        </Row>
    </>
);

export default App;
