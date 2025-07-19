import React from "react";
import { AudioLines, Menu, Settings, User } from "lucide-react";
import { useAppStore } from "../../store";

const Header: React.FC = () => {
  const { toggleSidebar } = useAppStore();

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <AudioLines className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AudioForensics
              </h1>
              <p className="text-xs text-gray-500">
                Professional Audio Analysis
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <input
            type="text"
            placeholder="Search audio files, analyses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Diya Noor</p>
              <p className="text-xs text-gray-500">Audio Analyst</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
