import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './components/navbar/navbar.component';
import AppRouter from './routers/app.router';
import 'antd/dist/antd.min.css';
import './app.scss';
import FooterComponent from './components/footer/footer.component';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
const App = () => (
    <>
        <Navbar />
        <Elements stripe={stripePromise}>
            <AppRouter />
        </Elements>
        <FooterComponent />
    </>
);

export default App;
