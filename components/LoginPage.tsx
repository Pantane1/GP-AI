
import React from 'react';
import Logo from './Logo';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-cyan-500/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_95%)]"></div>
      <div className="absolute inset-0 pointer-events-none [box-shadow:inset_0_0_100px_50px_black]"></div>
      
      <div className="z-10 flex flex-col items-center text-center">
        <Logo />
        <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-white mt-4">GP</h1>
        <p className="text-cyan-300 font-orbitron text-lg mt-2 tracking-widest">by Pantane</p>
        <p className="text-gray-300 mt-8 max-w-lg">
          Think. Create. See. — All in One.
        </p>
        <p className="text-gray-400 mt-2 text-sm max-w-lg">
          Welcome to the next generation of AI. Log in to start your journey into deep research and boundless creativity.
        </p>

        <div className="mt-12 w-full max-w-xs space-y-4">
          <button
            onClick={onLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.6)]"
          >
            Continue with Email
          </button>
          <button
            onClick={onLogin}
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
             <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.057 4.844C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.6-1.867 12.6-5.025L30.6 34.1c-2.025 1.4-4.525 2.2-7.2 2.2c-5.221 0-9.651-3.473-11.334-8.234l-6.057 4.844C9.656 39.663 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.057 4.844C42.218 35.258 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
            Continue with Google
          </button>
           <button
            onClick={onLogin}
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            Continue with Phone
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
