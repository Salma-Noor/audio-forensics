import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="bg-[#a94064] hover:bg-[#fce9ef] text-white hover:text-[#a94064] font-bold py-6 px-12 rounded-2xl shadow-md text-2xl w-[550px] h-[100px] transition-all duration-300"
  >
    {text}
  </button>
);

export default ActionButton;
