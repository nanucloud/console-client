import React from "react";
import { Search, Menu, Bell, User, ChevronDown } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="bg-white text-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 cursor-pointer hover:text-gray-600" />
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
              <img
                src="https://nanu.cc/NANU_Brand_Logo/NANU_CLOUD_LOGO_FULL.svg"
                alt="NANU CLOUD Logo"
                className="h-5"
              />
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="서비스, 기능 검색"
                className="w-full bg-gray-50 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
              <span>Seoul</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Bell className="h-6 w-6 cursor-pointer hover:text-gray-600" />
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
              <User className="h-6 w-6" />
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
