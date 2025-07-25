// src/components/ui/Card.tsx
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-xl p-6 border border-gray-200 ${className}`}>
      {title && <h2 className="text-4xl font-semibold mb-4 text-[#a94064]">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
