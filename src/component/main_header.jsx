import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, Search } from "lucide-react";

export default function Header({ setIsSidebarOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const notiRef = useRef(null);

  // ============================================================
  // TODO: เปลี่ยน URL นี้เมื่อได้ API จริง
  const API_URL = "https://suitably-nonbeneficed-marisol.ngrok-free.dev/api/notifications";
  // ============================================================

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        
        console.log("Notifications API Status:", res.status); // DEBUG
        
        if (!res.ok) {
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Notifications API Response:", data); // DEBUG
        
        // ตรวจสอบว่า response เป็น array หรือ object
        let notificationsArray = Array.isArray(data) ? data : data.notifications || data.data || [];
        
        // เพิ่ม is_read: false ให้ทุกรายการ (เพราะ API ยังไม่มี field นี้)
        setNotifications(notificationsArray.map((item) => ({ ...item, is_read: false })));
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        // ถ้า error ให้แสดง notification เดียวเหลือ
        setNotifications([
          {
            id: "error",
            message: `Error: ${err.message}`,
            created_at: new Date().toLocaleString("th-TH"),
            is_read: false,
          },
        ]);
      }
    };
    fetchNotifications();
  }, []);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setIsNotiOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

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

          {/* 🔔 Bell + Dropdown */}
          <div className="relative" ref={notiRef}>
            <button
              onClick={() => setIsNotiOpen((prev) => !prev)}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1
                                 bg-red-500 text-white text-[10px] font-bold
                                 rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {isNotiOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800
                              rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <span className="font-semibold text-sm">การแจ้งเตือน</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-xs text-[#1B00BF] hover:underline"
                    >
                      อ่านทั้งหมด
                    </button>
                  )}
                </div>

                {/* List */}
                <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-8 text-center text-sm text-gray-400">
                      ไม่มีการแจ้งเตือน
                    </li>
                  ) : (
                    notifications.map((noti) => (
                      <li
                        key={noti.id}
                        onClick={() => handleMarkAsRead(noti.id)}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                          noti.is_read ? "" : "bg-blue-50"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {/* จุดน้ำเงิน = ยังไม่อ่าน */}
                          <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${
                            noti.is_read ? "bg-transparent" : "bg-blue-500"
                          }`} />
                          <div className="flex-1 min-w-0">
                            {/* Title (บรรทัดแรก ตัวเข้ม) */}
                            <p className={`text-sm font-semibold ${
                              noti.is_read ? "text-gray-400" : "text-gray-800"
                            }`}>
                              {noti.title || "Notification"}
                            </p>
                            
                            {/* Message (บรรทัดรองลงมา ตัวเล็ก สีจาง) */}
                            {noti.message && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {noti.message}
                              </p>
                            )}
                            
                            {/* DateTime */}
                            <p className="text-xs text-gray-400 mt-1.5">
                              {noti.created_at}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Profile */}
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