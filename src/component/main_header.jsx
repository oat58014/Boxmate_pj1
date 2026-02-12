import React from "react";
import { Menu, Bell, Search } from "lucide-react";

export default function Header({ setIsSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#1B00BF] focus:border-transparent"
            />
          </div>
        </div>

        {/* Notifications & Profile */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 bg-[#1B00BF] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">U</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-700">ชื่อผู้ใช้</p>
              <p className="text-xs text-gray-500">user@email.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
