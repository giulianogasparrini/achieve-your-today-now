import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import AuthCallback from "../pages/auth/AuthCallback";

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoutes isLoggedIn={!!session}>
              <Home />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/goals" 
          element={
            <ProtectedRoutes isLoggedIn={!!session}>
              <GoalsPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/habits" 
          element={
            <ProtectedRoutes isLoggedIn={!!session}>
              <HabitsPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/challenges" 
          element={
            <ProtectedRoutes isLoggedIn={!!session}>
              <ChallengesPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/community" 
          element={
            <ProtectedRoutes isLoggedIn={!!session}>
              <CommunityPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/journal" 
          element={
            <ProtectedRoutes isLoggedIn={!!session}>
              <JournalPage />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoutes isLoggedIn={!!session}>
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
