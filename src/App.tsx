
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create placeholder pages for our future routes
const GoalsPage = () => <div className="page-container">Goals Page (Coming Soon)</div>;
const HabitsPage = () => <div className="page-container">Habits Page (Coming Soon)</div>;
const ChallengesPage = () => <div className="page-container">Challenges Page (Coming Soon)</div>;
const CommunityPage = () => <div className="page-container">Community Page (Coming Soon)</div>;
const JournalPage = () => <div className="page-container">Journal Page (Coming Soon)</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
