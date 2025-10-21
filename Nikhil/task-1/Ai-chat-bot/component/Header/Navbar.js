"use client";

import { useSession } from "next-auth/react";
import { Send, User, Plus, Home, Info, Settings, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Image from 'next/image';

const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="flex items-center justify-between bg-white/80 backdrop-blur-sm shadow-lg px-4 sm:px-6 py-3 border-b border-white/20">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Desktop Sidebar Toggle */}
        <button 
          onClick={onToggleSidebar}
          className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
        
        <h1 className="text-lg font-semibold gradient-text">AiChat</h1>
      </div>
      <nav className="flex gap-3 sm:gap-6 text-gray-700">
        <a href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Home className="w-4 h-4" /> Home
        </a>

        <a href="/about" className="hover:text-blue-600 flex items-center gap-1">
          <Info className="w-4 h-4" /> About
        </a>

        {!loading && session?.user ? (
          <>
            <a href="/profile" className="hover:text-blue-600 flex items-center gap-1">
              <div className="relative">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User Image"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    unoptimized={true}
                  />
                ) : null}
                <div 
                  className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold ${session.user?.image ? 'hidden' : 'flex'}`}
                  style={{ display: session.user?.image ? 'none' : 'flex' }}
                >
                  {session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
               Profile
            </a>

            <a href="/profileSetting" className="hover:text-blue-600 flex items-center gap-1">
              <Settings className="w-4 h-4" /> Settings
            </a>
          </>
        ) : (
          <a href="/api/auth/signin" className="bg-blue-500 text-white px-3 py-1 rounded">
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
