import React, { useState, useEffect } from "react";
import { Package, Users, TrendingUp, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./navbar";
import Header from "./main_header";
import { showToast } from "../utils/toastNotification";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    async function loadDashboardData() {
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
        if (!res.ok) throw new Error("Failed to fetch dashboard data");

        const data = await res.json();
        console.log("Dashboard API Response:", data); // DEBUG
        setApiData(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
          showToast.error("ไม่สามารถโหลดข้อมูลแดชบอร์ด");
        }
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      คำสั่งซื้อทั้งหมด
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {apiData?.data?.Total_orders || 0}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      คำสั่งจาก Lazada
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {apiData?.data?.Lazada_orders || 0}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      คำสั่งจาก TikTok
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {apiData?.data?.Tiktok_orders || 0}
                    </p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      รอดำเนินการ
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {apiData?.data?.Pending_orders || 0}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      ยอดขายรวม
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      ฿{(apiData?.data?.Revenue || 0).toLocaleString("th-TH", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  กิจกรรมล่าสุด
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {loading && <p className="text-gray-500">กำลังโหลด...</p>}
                  {error && (
                    <p className="text-red-500">เกิดข้อผิดพลาด: {error}</p>
                  )}
                  {apiData?.Order && apiData.Order.length > 0 ? (
                    apiData.Order.slice(0, 5).map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg
                                 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-[#1B00BF] rounded-full flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {order.Customer_Name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Order: {order.Order_id} • {order.Platform}
                          </p>
                          <p className="text-xs text-gray-500">
                            ฿{Number(order.Total).toLocaleString("th-TH")}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                            order.Status === "canceled" ||
                            order.Status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : order.Status === "confirmed" ||
                                order.Status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.Status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">ไม่มีกิจกรรม</p>
                  )}
                </div>
              </div>

              {/* Sales Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  ยอดขายรายวัน
                </h2>
                {apiData?.data_stat && apiData.data_stat.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={apiData.data_stat.slice(-10).reverse()}
                      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) =>
                          `฿${Number(value).toLocaleString("th-TH")}`
                        }
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="totalSales"
                        stroke="#1B00BF"
                        strokeWidth={2}
                        dot={{ fill: "#1B00BF" }}
                        activeDot={{ r: 6 }}
                        name="ยอดขาย"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500 text-center">ไม่มีข้อมูลกราฟ</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
