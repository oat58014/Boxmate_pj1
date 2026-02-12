import React, { useState } from "react";
import {
  Home,
  Package,
  Users,
  Settings,
  LogOut,
  LayoutDashboard,
  X,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PieChart,
  Box,
  ShoppingCart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../image/boxmateLogo1.jpg";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const [openSubmenu, setOpenSubmenu] = useState(null); // เปลี่ยนเป็น state เดียว
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "หน้าหลัก", path: "/" },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      hasSubmenu: true,
      submenu: [
        { icon: BarChart3, label: "Statistics", path: "/dashboard/stats" },
        { icon: PieChart, label: "Analytics", path: "/dashboard/analytics" },
      ],
    },
    {
      icon: Package,
      label: "พัสดุ",
      hasSubmenu: true,
      submenu: [
        { icon: Box, label: "Stock", path: "/packages/stock" },
        { icon: ShoppingCart, label: "Order", path: "/packages/order" },
      ],
    },
    { icon: Users, label: "ผู้ใช้งาน", path: "/users" },
    { icon: Settings, label: "ตั้งค่า", path: "/settings" },
  ];

  const handleSubmenuToggle = (label) => {
    // ถ้ากดเมนูที่เปิดอยู่แล้ว ให้ปิด ไม่งั้นให้เปิดเมนูใหม่
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isSubmenuOpen = (label) => {
    return openSubmenu === label;
  };

  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#1B00BF] text-white">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <img src={Logo} alt="Boxmate Logo" className="w-32 h-auto mx-auto" />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.hasSubmenu ? (
                <>
                  {/* Menu with Submenu */}
                  <button
                    onClick={() => handleSubmenuToggle(item.label)}
                    className="flex items-center justify-between w-full gap-3 px-4 py-3 rounded-lg
                             hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isSubmenuOpen(item.label) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {/* Submenu */}
                  {isSubmenuOpen(item.label) && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg
                                   hover:bg-white/10 transition-colors text-sm ${
                                     location.pathname === subItem.path
                                       ? "bg-white/20"
                                       : ""
                                   }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg
                           hover:bg-white/10 transition-colors group ${
                             location.pathname === item.path
                               ? "bg-white/20"
                               : ""
                           }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg
                           hover:bg-white/10 transition-colors text-red-300 hover:text-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <aside
          className={`fixed left-0 top-0 bottom-0 w-64 bg-[#1B00BF] text-white
                     transform transition-transform overflow-y-auto ${
                       isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                     }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <img src={Logo} alt="Boxmate Logo" className="w-24 h-auto" />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.hasSubmenu ? (
                  <>
                    {/* Menu with Submenu */}
                    <button
                      onClick={() => handleSubmenuToggle(item.label)}
                      className="flex items-center justify-between w-full gap-3 px-4 py-3 rounded-lg
                               hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isSubmenuOpen(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* Submenu */}
                    {isSubmenuOpen(item.label) && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg
                                     hover:bg-white/10 transition-colors text-sm ${
                                       location.pathname === subItem.path
                                         ? "bg-white/20"
                                         : ""
                                     }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg
                             hover:bg-white/10 transition-colors ${
                               location.pathname === item.path
                                 ? "bg-white/20"
                                 : ""
                             }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg
                             hover:bg-white/10 transition-colors text-red-300 hover:text-red-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
