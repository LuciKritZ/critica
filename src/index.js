import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Router } from 'react-router-dom';
import { appHistory } from './utils/history.utils';
import { UserProvider } from './providers/user.providers';
import { AuthProvider } from './providers/auth-provider.providers';
import App from './App';

// delete vitals
ReactDOM.render(
    <Router history={appHistory}>
        <AuthProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </AuthProvider>
    </Router>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
