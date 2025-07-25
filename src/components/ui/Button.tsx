// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#a94064] hover:bg-[#922d4f] text-white font-semibold py-3 px-8 rounded-full text-lg transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
