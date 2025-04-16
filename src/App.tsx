
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
            <Route path="/login" element={<Login />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
