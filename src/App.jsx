import React, { useState } from 'react';
import HomeView from './components/HomeView';
import WaitingView from './components/WaitingView';
import ChatView from './components/ChatView';

const App = () => {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView setView={setView} />;
      case 'waiting':
        return <WaitingView setView={setView} />;
      case 'chat':
        return <ChatView setView={setView} />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="w-full h-screen">
      {renderView()}
    </div>
  );
};

export default App;