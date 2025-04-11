import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './frontend/Login';
import MainPage from './frontend/MainPage';
import QuoteFetcherPage from './frontend/QuoteFetcherPage';
import AdvicePage from './frontend/advicePage';
import FavoritesPage from './frontend/FavoritesPage';


export default function App() {
    const [user, setUser] = useState(null);


    return (
        <Routes>
            <Route path="/" element={!user ? <Login onLogin={setUser} /> : <MainPage user={user} />} />
            <Route path="/quotes" element={<QuoteFetcherPage />} />
            <Route path="/advice" element={<AdvicePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

        </Routes>
    );
}
