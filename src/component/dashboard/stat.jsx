import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Activity,
  Target,
  Zap,
  Download,
} from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "../navbar";
import Header from "../main_header";
import { showToast } from "../../utils/toastNotification";

export default function Analytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("this");

  // API data state: initialise as null so UI shows null when absent
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // helper to parse trend strings like "+12%" or "-3%" into numbers
  const parseTrend = (t) => {
    if (t === null || t === undefined) return 0;
    if (typeof t === "number") return t;
    try {
      const s = String(t).replace(/[^0-9\-+.]/g, "");
      const v = parseFloat(s);
      return Number.isFinite(v) ? v : 0;
    } catch (e) {
      return 0;
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // adjust endpoint to your backend API
        const res = await fetch("https://suitably-nonbeneficed-marisol.ngrok-free.dev/api/dashboard/data", {
          signal: ac.signal,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!res.ok) throw new Error("Failed to load dashboard");
        const json = await res.json();
        console.log("Stat Dashboard API Response:", json);
        // expected json shape: { metrics, userBehavior, trafficSources, topPerformers, packageDistribution, satisfaction, weeklyTrends, data_stat, Order }
        setDashboardData(json || null);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || String(err));
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {/* Analytics Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header with Export */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Dashboard &gt; Statistics</p>
                <h1 className="text-4xl font-bold text-[#1B00BF] mb-2">
                  Performance Overview
                </h1>
                <p className="text-gray-600">
                  การติดตามประสิทธิภาพการขายและผู้ใช้งาน
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>

            {/* Performance Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Revenue */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                    <p className="text-gray-600 text-xs mt-1">เรารวมจำหน่ายรายได้ทั้งหมด</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  ฿428,500
                </p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm font-semibold">↑19.4%</span>
                  <span className="text-gray-500 text-xs ml-1">from last month</span>
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                    <p className="text-gray-600 text-xs mt-1">คำสั่งซื้อทั้งหมด</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  1,248
                </p>
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 text-sm font-semibold">↓8.1%</span>
                  <span className="text-gray-500 text-xs ml-1">from last month</span>
                </div>
              </div>

              {/* Avg Order Value */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Avg Order Value</p>
                    <p className="text-gray-600 text-xs mt-1">มูลค่าออเดอร์เฉลี่ย</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  ฿343.34
                </p>
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 text-sm font-semibold">↓2.3%</span>
                  <span className="text-gray-500 text-xs ml-1">from last month</span>
                </div>
              </div>

              {/* New Customers */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">New Customers</p>
                    <p className="text-gray-600 text-xs mt-1">ลูกค้าใหม่</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  312
                </p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm font-semibold">↑18.7%</span>
                  <span className="text-gray-500 text-xs ml-1">from last month</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Daily Sales Performance - Large Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Daily Sales Performance
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedMonth("this")}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                        selectedMonth === "this"
                          ? "text-[#1B00BF] bg-blue-100"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      This Month
                    </button>
                    <button 
                      onClick={() => setSelectedMonth("last")}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                        selectedMonth === "last"
                          ? "text-[#1B00BF] bg-blue-100"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Last Month
                    </button>
                  </div>
                </div>
                <div className="h-80 bg-white rounded-lg border border-gray-100 p-4">
                  {/* Daily Sales Performance Chart */}
                  <div className="flex items-end justify-between w-full gap-2" style={{ height: '300px' }}>
                    {(selectedMonth === "this"
                      ? [
                          { day: "Mon", sales: 45 },
                          { day: "Tue", sales: 62 },
                          { day: "Wed", sales: 58 },
                          { day: "Thu", sales: 75 },
                          { day: "Fri", sales: 88 },
                          { day: "Sat", sales: 92 },
                          { day: "Sun", sales: 68 },
                        ]
                      : [
                          { day: "Mon", sales: 38 },
                          { day: "Tue", sales: 52 },
                          { day: "Wed", sales: 48 },
                          { day: "Thu", sales: 65 },
                          { day: "Fri", sales: 78 },
                          { day: "Sat", sales: 82 },
                          { day: "Sun", sales: 58 },
                        ]
                    ).map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1">
                        <div className="flex gap-1 items-end justify-center h-full w-full">
                          <div
                            className="flex-1 rounded-t bg-[#1B00BF]"
                            style={{ height: `${(item.sales / 100) * 250}px` }}
                            title={`Sales: ${item.sales}%`}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-600 mt-3">
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Revenue by Category */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Revenue by Category
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Electronics</span>
                      <span className="text-sm font-bold text-gray-900">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#1B00BF] h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Fashion & Apparel</span>
                      <span className="text-sm font-bold text-gray-900">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Home & Living</span>
                      <span className="text-sm font-bold text-gray-900">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Beauty & Personal Care</span>
                      <span className="text-sm font-bold text-gray-900">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Selling Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Best Selling Products
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        PRODUCT NAME
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        CATEGORY
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        SALES VOLUME
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        UNIT PRICE
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        TOTAL REVENUE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        Wireless Headphones Pro
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        Electronics
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        324 units
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ฿2,499
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-gray-900">
                        ฿809,676
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        Premium T-Shirt Bundle
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        Fashion & Apparel
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        512 units
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ฿599
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-gray-900">
                        ฿306,688
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        Smart LED Bulb Set
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        Home & Living
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        289 units
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ฿1,299
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-gray-900">
                        ฿375,411
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        Organic Skincare Kit
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        Beauty & Personal Care
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        198 units
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ฿899
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-gray-900">
                        ฿178,002
                      </td>
                    </tr>
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
