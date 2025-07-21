import React from "react";
import {
  LayoutDashboard,
  Microscope,
  FileText,
  Settings,
  Upload,
  AudioWaveform,
  Shield,
  BarChart3,
  AudioLines, // new icon
} from "lucide-react";
import { useAppStore } from "../../store";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  page: "dashboard" | "analysis" | "reports" | "settings" | "transcribe"; // ⬅️ add 'transcribe'
  badge?: string;
}

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, sidebarCollapsed } = useAppStore();

  const navigationItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      page: "dashboard",
    },
    {
      id: "analysis",
      label: "Audio Analysis",
      icon: <Microscope className="w-5 h-5" />,
      page: "analysis",
      badge: "NEW",
    },
    {
      id: "transcribe", // ⬅️ added new nav item
      label: "Transcribe Audio",
      icon: <AudioLines className="w-5 h-5" />, // use any relevant Lucide icon
      page: "transcribe",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileText className="w-5 h-5" />,
      page: "reports",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      page: "settings",
    },
  ];

  const toolsItems = [
    {
      id: "upload",
      label: "Upload Audio",
      icon: <Upload className="w-4 h-4" />,
    },
    {
      id: "waveform",
      label: "Waveform Viewer",
      icon: <AudioWaveform className="w-4 h-4" />,
    },
    {
      id: "authentication",
      label: "Authentication",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "spectral",
      label: "Spectral Analysis",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 p-4 space-y-2">
          <div className={`${sidebarCollapsed ? "hidden" : "block"} mb-6`}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </h2>
          </div>

          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.page)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                currentPage === item.page
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={
                  currentPage === item.page ? "text-blue-600" : "text-gray-500"
                }
              >
                {item.icon}
              </span>
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}

          <div className={`${sidebarCollapsed ? "hidden" : "block"} pt-6`}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Forensics Tools
            </h2>

            {toolsItems.map((tool) => (
              <button
                key={tool.id}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left text-gray-600 hover:bg-gray-50"
              >
                <span className="text-gray-400">{tool.icon}</span>
                <span className="text-sm">{tool.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div
          className={`p-4 border-t border-gray-200 ${
            sidebarCollapsed ? "hidden" : "block"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Pro Features
            </h3>
            <p className="text-xs text-gray-600 mb-2">
              Unlock advanced forensics capabilities
            </p>
            <button className="w-full bg-blue-600 text-white text-xs py-2 px-3 rounded-md hover:bg-blue-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
