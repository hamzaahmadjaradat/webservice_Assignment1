import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './frontend/Login';
import MainPage from './frontend/MainPage';
import QuoteFetcherPage from './frontend/QuoteFetcherPage';
import AdvicePage from './frontend/advicePage';
import FavoritesPage from './frontend/FavoritesPage';
import SignUp from './frontend/Signup';
import JokeFetcher from './frontend/jokeFetcher';

export default function App() {
    const [user, setUser] = useState(null);

    return (
        <Routes>
            {}
            <Route
                path="/"
                element={!user ? <Login onLogin={setUser} /> : <MainPage user={user} />}
            />

            {}
            <Route
                path="/quotes"
                element={user ? <QuoteFetcherPage user={user} /> : <Login onLogin={setUser} />}
            />
            <Route
                path="/advice"
                element={user ? <AdvicePage user={user} /> : <Login onLogin={setUser} />}
            />
            <Route
                path="/favorites"
                element={user ? <FavoritesPage user={user} /> : <Login onLogin={setUser} />}
            />
            <Route
                path="/joke"
                element={user ? <JokeFetcher user={user} /> : <Login onLogin={setUser} />}
            />

            {}
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}
