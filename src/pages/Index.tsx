import { useState } from "react";
import Welcome from "@/components/Welcome";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";

type AppState = 'welcome' | 'auth' | 'dashboard';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('welcome');

  const renderCurrentView = () => {
    switch (appState) {
      case 'welcome':
        return <Welcome onGetStarted={() => setAppState('auth')} />;
      case 'auth':
        return (
          <Auth 
            onBack={() => setAppState('welcome')} 
            onLogin={() => setAppState('dashboard')} 
          />
        );
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Welcome onGetStarted={() => setAppState('auth')} />;
    }
  };

  return renderCurrentView();
};

export default Index;
