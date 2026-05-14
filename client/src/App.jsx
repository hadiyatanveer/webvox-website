import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import DocsLayout from './pages/docs/DocsLayout';
import SetupHasura from './pages/docs/SetupHasura';
import EmbedChatbot from './pages/docs/EmbedChatbot';


function App() {
    return (
        <AuthProvider>
            <Router>
                {/* Navbar sits outside Routes to remain persistent */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/docs" element={<DocsLayout />}>
                        <Route path="setup-hasura" element={<SetupHasura />} />
                        <Route path="embed-chatbot" element={<EmbedChatbot />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;