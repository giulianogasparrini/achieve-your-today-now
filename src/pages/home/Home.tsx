
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import DailyOverview from "../../components/dashboard/DailyOverview";
import WelcomeHeader from "../../components/dashboard/WelcomeHeader";

const Home = () => {
  return (
    <MainLayout>
      <WelcomeHeader />
      <div className="p-4">
        <DailyOverview />
      </div>
    </MainLayout>
  );
};

export default Home;
