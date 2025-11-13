
import React from 'react';

interface LogoProps {
    small?: boolean;
}

const Logo: React.FC<LogoProps> = ({ small = false }) => {
  const sizeClasses = small ? 'w-8 h-8 text-xl' : 'w-24 h-24 text-6xl';
  const shadowClasses = small ? 'shadow-[0_0_8px_rgba(0,255,255,0.7)]' : 'shadow-[0_0_20px_rgba(0,255,255,0.7)]';

  return (
    <div className={`flex items-center justify-center bg-black rounded-full font-orbitron font-bold text-cyan-300 transition-all ${sizeClasses} ${shadowClasses}`}>
      GP
    </div>
  );
};

export default Logo;
