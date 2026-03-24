import React, { useState, useEffect } from "react";
import {
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Activity,
  Clock,
  AlertCircle,
} from "lucide-react";
import Navbar from "../navbar";
import Header from "../main_header";
import { showToast } from "../../utils/toastNotification";

export default function Stat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [analyticData, setAnalyticData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    async function loadAnalyticData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          "https://suitably-nonbeneficed-marisol.ngrok-free.dev/api/dashboard/data",
          {
            signal: ac.signal,
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        console.log("Dashboard Data API Status:", res.status);

        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();
        console.log("Dashboard Data API Response:", data);
        setAnalyticData(data?.data || data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch analytic data:", err);
          setError(err.message);
          showToast.error("ไม่สามารถโหลดข้อมูล Dashboard");
        }
      } finally {
        setLoading(false);
      }
    }
    loadAnalyticData();
    return () => ac.abort();
  }, []);

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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard 📊
              </h1>
              <p className="text-gray-600">ภาพรวมและสถิติการใช้งานระบบ</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Card 1: Total Orders */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Package className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-white/80" />
                </div>
                <p className="text-white/80 text-sm font-medium">
                  คำสั่งซื้อทั้งหมด
                </p>
                <p className="text-3xl font-bold mt-1">
                  {loading ? "-" : analyticData?.Total_orders || 0}
                </p>
                <p className="text-xs text-white/70 mt-2">ทั้งหมดแพลตฟอร์ม</p>
              </div>

              {/* Card 2: Lazada Orders */}
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Package className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-white/80" />
                </div>
                <p className="text-white/80 text-sm font-medium">Lazada Orders</p>
                <p className="text-3xl font-bold mt-1">
                  {loading ? "-" : analyticData?.Lazada_orders || 0}
                </p>
                <p className="text-xs text-white/70 mt-2">
                  {analyticData?.Total_orders > 0
                    ? Math.round((analyticData?.Lazada_orders / analyticData?.Total_orders) * 100)
                    : 0}
                  % ของทั้งหมด
                </p>
              </div>

              {/* Card 3: Pending Orders */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <AlertCircle className="w-5 h-5 text-white/80" />
                </div>
                <p className="text-white/80 text-sm font-medium">รอดำเนินการ</p>
                <p className="text-3xl font-bold mt-1">
                  {loading ? "-" : analyticData?.Pending_orders || 0}
                </p>
                <p className="text-xs text-white/70 mt-2">คำสั่งที่รอการยืนยัน</p>
              </div>

              {/* Card 4: Revenue */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-white/80" />
                </div>
                <p className="text-white/80 text-sm font-medium">ยอดรายได้</p>
                <p className="text-2xl font-bold mt-1">
                  ฿{loading ? "-" : (analyticData?.Revenue || 0).toLocaleString("th-TH", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-white/70 mt-2">รวมจากทั้งหมด</p>
              </div>
            </div>

            {/* Charts & Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Chart Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    สถิติรายเดือน
                  </h2>
                  <button className="text-[#1B00BF] hover:text-[#1500a0] text-sm font-medium flex items-center gap-1">
                    ดูทั้งหมด
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Chart Placeholder</p>
                </div>
              </div>

              {/* Activity Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    กิจกรรมล่าสุด
                  </h2>
                  <button className="text-[#1B00BF] hover:text-[#1500a0] text-sm font-medium flex items-center gap-1">
                    ดูทั้งหมด
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      user: "สมชาย ใจดี",
                      action: "รับพัสดุ",
                      time: "5 นาทีที่แล้ว",
                      status: "success",
                    },
                    {
                      user: "สมหญิง มีสุข",
                      action: "ลงทะเบียน",
                      time: "15 นาทีที่แล้ว",
                      status: "info",
                    },
                    {
                      user: "ประยุทธ์ รักดี",
                      action: "แจ้งปัญหา",
                      time: "30 นาทีที่แล้ว",
                      status: "warning",
                    },
                    {
                      user: "วิไล สวยงาม",
                      action: "รับพัสดุ",
                      time: "1 ชั่วโมงที่แล้ว",
                      status: "success",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {activity.user} - {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  รายการพัสดุล่าสุด
                </h2>
                <button className="text-[#1B00BF] hover:text-[#1500a0] text-sm font-medium flex items-center gap-1">
                  ดูทั้งหมด
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        รหัส
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        ผู้รับ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        วันที่
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        สถานะ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        การดำเนินการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "PKG001",
                        name: "สมชาย ใจดี",
                        date: "12/02/2026",
                        status: "รับแล้ว",
                      },
                      {
                        id: "PKG002",
                        name: "สมหญิง มีสุข",
                        date: "12/02/2026",
                        status: "รอรับ",
                      },
                      {
                        id: "PKG003",
                        name: "ประยุทธ์ รักดี",
                        date: "11/02/2026",
                        status: "รับแล้ว",
                      },
                      {
                        id: "PKG004",
                        name: "วิไล สวยงาม",
                        date: "11/02/2026",
                        status: "รอรับ",
                      },
                      {
                        id: "PKG005",
                        name: "มานะ ขยัน",
                        date: "10/02/2026",
                        status: "รับแล้ว",
                      },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                          {item.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.date}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              item.status === "รับแล้ว"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-[#1B00BF] hover:text-[#1500a0] text-sm font-medium">
                            ดูรายละเอียด
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
