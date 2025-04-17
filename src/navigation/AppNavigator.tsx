
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/not-found/NotFound";
import GoalsPage from "../pages/goals/Goals";
import HabitsPage from "../pages/habits/Habits";
import ChallengesPage from "../pages/challenges/Challenges";
import CommunityPage from "../pages/community/Community";
import JournalPage from "../pages/journal/Journal";
import Profile from "../pages/profile/Profile";

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const hasVisited = localStorage.getItem('hasVisited');
  const isLoggedIn = localStorage.getItem('userFirstName');

  useEffect(() => {
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : (
              <Home />
            )
          }
        />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path="/goals" 
          element={
            <ProtectedRoutes isLoggedIn={!!isLoggedIn}>
              <GoalsPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/habits" 
          element={
            <ProtectedRoutes isLoggedIn={!!isLoggedIn}>
              <HabitsPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/challenges" 
          element={
            <ProtectedRoutes isLoggedIn={!!isLoggedIn}>
              <ChallengesPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/community" 
          element={
            <ProtectedRoutes isLoggedIn={!!isLoggedIn}>
              <CommunityPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/journal" 
          element={
            <ProtectedRoutes isLoggedIn={!!isLoggedIn}>
              <JournalPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoutes isLoggedIn={!!isLoggedIn}>
              <Profile />
            </ProtectedRoutes>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigator;
