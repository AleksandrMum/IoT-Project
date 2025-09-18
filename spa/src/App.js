import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Devices from './components/Devices';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/devices" element={<Devices />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
