// App.js
import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './componets/Layout/Layout';
import Home from './componets/Pages/Home';
import About from './componets/Pages/About';
import Team from './componets/Team/Team';
import TeamDetails from './componets/TeamDetails/TeamDetails';
import LikedUsers from './componets/LikedUsers/LikedUsers';
import NotFound from './componets/Pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} className="home-page">
          <Route index element={<Home />} />
        </Route>
        <Route path="about" element={<Layout />} className="about-page">
          <Route index element={<About />} />
        </Route>
        <Route path="team" element={<Layout />} className="team-page">
          <Route index element={<Team />} />
          <Route path=":id" element={<TeamDetails />} />
        </Route>
        <Route path="users" element={<Layout />}>
          <Route index element={<LikedUsers />} />
        </Route>
        <Route path="liked-users" element={<Layout />}>
          <Route index element={<LikedUsers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}