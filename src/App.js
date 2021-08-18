import React from 'react';
import Navbar from './components/navbar/navbar.component';
import AppRouter from './routers/app.router';
import 'antd/dist/antd.min.css';

const App = () => (
    <>
        <Navbar />
        <AppRouter />
    </>
);

export default App;
