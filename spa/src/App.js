import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Devices from './components/Devices';
import Commands from './components/Commands';

function App() {
    return (
        <div className="app-root">
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/devices" element={<Devices />} />
                    <Route path="/commands" element={<Commands />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
