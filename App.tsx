
import React, { useState } from 'react';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {isAuthenticated ? <ChatPage /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default App;
