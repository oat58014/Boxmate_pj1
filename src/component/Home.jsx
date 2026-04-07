import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Users, TrendingUp, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
  const navigate = useNavigate();
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
              <p className="text-gray-500 text-sm font-medium mb-1">Home</p>
              <h1 className="text-4xl font-bold">
                <span className="text-black">WELCOME!</span>{" "}
                <span className="text-[#1B00BF]">BOONTHAVORN</span>
              </h1>
              <p className="text-gray-600 mt-2">
                จัดการพัสดุและข้อมูลของคุณได้ที่นี่
              </p>
            </div>

            {/* Stats Cards with New Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:h-96">
              {/* Left: Sales Chart - 7 days */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    ยอดขาย
                  </h2>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">ยอดขายวันนี้</p>
                    <p className="text-2xl font-bold text-[#1B00BF]">
                      ฿{(apiData?.data_stat && apiData.data_stat.length > 0 
                        ? apiData.data_stat[apiData.data_stat.length - 1].totalSales 
                        : 0).toLocaleString("th-TH")}
                    </p>
                  </div>
                </div>
                {apiData?.data_stat && apiData.data_stat.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={apiData.data_stat.slice(-7).map((item, index) => ({
                        ...item,
                        isToday: index === apiData.data_stat.slice(-7).length - 1,
                      }))}
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
                      <Bar
                        dataKey="totalSales"
                        fill="#1B00BF"
                        name="ยอดขาย"
                        shape={({ x, y, width, height, fill, payload }) => {
                          const barFill = payload.isToday ? "#1B00BF" : "#ADD8E6";
                          return (
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              fill={barFill}
                            />
                          );
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">ไม่มีข้อมูลกราฟ</p>
                  </div>
                )}
              </div>

              {/* Right: Stacked Cards */}
              <div className="flex flex-col gap-3">
                {/* Lazada - Top Card */}
                <div className="flex-1 bg-[#1B00BF] rounded-xl shadow-sm p-6 border border-gray-200 text-white relative flex flex-col">
                  <div className="absolute top-6 right-6 bg-white/20 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/70 text-sm font-medium">
                    ยอดขาย Lazada
                  </p>
                  <p className="text-3xl font-bold text-white mt-auto">
                    {apiData?.data?.Lazada_orders || 0}
                  </p>
                </div>

                {/* TikTok - Bottom Card */}
                <div className="flex-1 bg-black rounded-xl shadow-sm p-6 border border-gray-200 text-white relative flex flex-col">
                  <div className="absolute top-6 right-6 bg-white/20 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/70 text-sm font-medium">
                    ยอดขาย TikTok
                  </p>
                  <p className="text-3xl font-bold text-white mt-auto">
                    {apiData?.data?.Tiktok_orders || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/packages/order")}>
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

              {/* Low Stock Products */}
              <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/packages/stock")}>
                <h2 className="text-xl font-bold text-red-700 mb-4">
                  สินค้าใกล้หมด
                </h2>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {loading && <p className="text-red-600">กำลังโหลด...</p>}
                  {error && (
                    <p className="text-red-600">เกิดข้อผิดพลาด: {error}</p>
                  )}
                  {apiData?.LowStockProducts && apiData.LowStockProducts.length > 0 ? (
                    apiData.LowStockProducts.slice(0, 5).map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-red-100/50 rounded-lg border border-red-200"
                      >
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-red-900 truncate text-sm">
                            {product.Product_name}
                          </p>
                          <p className="text-xs text-red-700">
                            เหลือ: {product.stock_remaining} ชิ้น
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-red-600 text-sm text-center py-4">ไม่มีสินค้าใกล้หมด</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
