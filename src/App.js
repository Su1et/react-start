import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/app.css';

function App() {
    return (
        <div className="app-wrapper">
            <Router>
                <Header />
            </Router>
            <div className="content-wrapper">
            </div>
            <Footer />
        </div>
    );
}

export default App;
