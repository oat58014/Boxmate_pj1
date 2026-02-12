import React, { useState } from "react";
import { Package, Users } from "lucide-react";
import Navbar from "./navbar";
import Header from "./main_header";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                ยินดีต้อนรับ! 👋
              </h1>
              <p className="text-gray-600">
                จัดการพัสดุและข้อมูลของคุณได้ที่นี่
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      พัสดุทั้งหมด
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">124</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">รอรับ</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">รับแล้ว</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">98</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      ผู้ใช้งาน
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">45</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                กิจกรรมล่าสุด
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg
                             hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#1B00BF] rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        พัสดุ #PKG00{item} ถึงแล้ว
                      </p>
                      <p className="text-sm text-gray-500">
                        {item} นาทีที่แล้ว
                      </p>
                    </div>
                    <button className="text-[#1B00BF] hover:text-[#1500a0] font-medium text-sm">
                      ดูรายละเอียด
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
