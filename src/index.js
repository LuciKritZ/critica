import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Router } from 'react-router-dom';
import AppRouter from './routers/app.router';
import { appHistory } from './utils/history.utils';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        {/* App rendered by a router to allow navigation using app bar */}
        <Router history={appHistory}>
            <AppRouter />
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
