
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import GoalsPage from "./pages/Goals";
import HabitsPage from "./pages/Habits";
import ChallengesPage from "./pages/Challenges";
import CommunityPage from "./pages/Community";
import JournalPage from "./pages/Journal";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => {
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Index />
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
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <GoalsPage />
                )
              } 
            />
            <Route 
              path="/habits" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <HabitsPage />
                )
              } 
            />
            <Route 
              path="/challenges" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ChallengesPage />
                )
              } 
            />
            <Route 
              path="/community" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <CommunityPage />
                )
              } 
            />
            <Route 
              path="/journal" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <JournalPage />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Profile />
                )
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
