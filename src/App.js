import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { Row, Col } from 'antd';
import Navbar from './components/navbar/navbar.component';
import AppRouter from './routers/app.router';
import 'antd/dist/antd.min.css';
import './app.scss';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
const App = () => (
    <>
        <Navbar />
        <Row>
            <Col className="app-body" xs={24}>
            <Elements stripe={stripePromise} >
                <AppRouter />
            </Elements>
            </Col>
        </Row>
    </>
);

export default App;
