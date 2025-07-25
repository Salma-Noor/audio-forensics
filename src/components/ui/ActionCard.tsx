import React from 'react';

interface ActionCardProps {
  title: string;
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, onClick }) => (
  <div
    className="bg-[#a94064] text-white shadow-lg rounded-3xl p-6 w-full max-w-[3200px] h-[100px] flex justify-center items-center cursor-pointer hover:bg-[#fce9ef] hover:text-[#a94064] border-2 border-[#a94064] transition"
    onClick={onClick}
  >
    <h3 className="text-[#a94064] text-xl font-bold text-center">{title}</h3>
  </div>
);

export default ActionCard;
