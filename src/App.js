import React from 'react';
import Navbar from './components/navbar/navbar.component';
import AppRouter from './routers/app.router';

const App = () => (
    <Navbar>
        <AppRouter />
    </Navbar>
);

export default App;
