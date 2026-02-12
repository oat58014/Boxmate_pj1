import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Activity,
  Target,
  Zap,
} from "lucide-react";
import Navbar from "../navbar";
import Header from "../main_header";

export default function Analytics() {
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

        {/* Analytics Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Analytics 📈
              </h1>
              <p className="text-gray-600">
                วิเคราะห์และติดตามประสิทธิภาพการทำงาน
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Metric 1 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +15.3%
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">68.4%</p>
                <p className="text-xs text-gray-400 mt-2">
                  เทียบกับเดือนที่แล้ว
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +24.7%
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Average Revenue
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">฿4,580</p>
                <p className="text-xs text-gray-400 mt-2">
                  เทียบกับเดือนที่แล้ว
                </p>
              </div>

              {/* Metric 3 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-red-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    -8.2%
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Response Time
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  2.4 นาที
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  เทียบกับเดือนที่แล้ว
                </p>
              </div>

              {/* Metric 4 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +32.1%
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Efficiency Score
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">92.8%</p>
                <p className="text-xs text-gray-400 mt-2">
                  เทียบกับเดือนที่แล้ว
                </p>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* User Behavior Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  พฤติกรรมผู้ใช้งาน
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "รับพัสดุ", value: 45, color: "bg-blue-500" },
                    { label: "ตรวจสอบสถานะ", value: 72, color: "bg-green-500" },
                    { label: "แจ้งปัญหา", value: 15, color: "bg-yellow-500" },
                    {
                      label: "ติดต่อเจ้าหน้าที่",
                      value: 28,
                      color: "bg-purple-500",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          {item.value}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  แหล่งที่มาของผู้ใช้
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      source: "Direct",
                      users: "12,458",
                      percentage: 42,
                      trend: "+12%",
                      trendUp: true,
                    },
                    {
                      source: "Social Media",
                      users: "8,924",
                      percentage: 30,
                      trend: "+8%",
                      trendUp: true,
                    },
                    {
                      source: "Email",
                      users: "5,231",
                      percentage: 18,
                      trend: "-3%",
                      trendUp: false,
                    },
                    {
                      source: "Referral",
                      users: "2,947",
                      percentage: 10,
                      trend: "+5%",
                      trendUp: true,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {item.source}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.users} users
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">
                            {item.percentage}%
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              item.trendUp ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {item.trend}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Top Performers */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Top Performers
                </h2>
                <div className="space-y-3">
                  {[
                    { name: "สมชาย ใจดี", score: 98, packages: 234 },
                    { name: "สมหญิง มีสุข", score: 95, packages: 198 },
                    { name: "ประยุทธ์ รักดี", score: 92, packages: 176 },
                    { name: "วิไล สวยงาม", score: 89, packages: 165 },
                  ].map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-[#1B00BF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {person.packages} packages
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#1B00BF]">
                          {person.score}
                        </p>
                        <p className="text-xs text-gray-500">score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  การกระจายพัสดุ
                </h2>
                <div className="space-y-3">
                  {[
                    { type: "Express", count: 45, color: "bg-red-500" },
                    { type: "Standard", count: 68, color: "bg-blue-500" },
                    { type: "Economy", count: 32, color: "bg-green-500" },
                    {
                      type: "International",
                      count: 12,
                      color: "bg-purple-500",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 ${item.color} rounded-full`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          {item.type}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-800">
                        {item.count}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-800">157</span>
                  </div>
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  ความพึงพอใจ
                </h2>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className="text-green-500 stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset="50.24"
                        transform="rotate(-90 50 50)"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800">
                        4.8
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">จาก 5 คะแนน</p>
                  <p className="text-xs text-gray-500 mt-1">2,458 reviews</p>
                </div>
                <div className="mt-4 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-8">
                        {star} ⭐
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${
                              star === 5
                                ? 80
                                : star === 4
                                  ? 15
                                  : star === 3
                                    ? 3
                                    : star === 2
                                      ? 1
                                      : 1
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-10 text-right">
                        {star === 5
                          ? "80%"
                          : star === 4
                            ? "15%"
                            : star === 3
                              ? "3%"
                              : star === 2
                                ? "1%"
                                : "1%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trends Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                แนวโน้มรายสัปดาห์
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        สัปดาห์
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        พัสดุรับ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        ผู้ใช้ใหม่
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        ประสิทธิภาพ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        เทรนด์
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        week: "สัปดาห์ที่ 1",
                        packages: 245,
                        users: 28,
                        efficiency: 94,
                        trend: "up",
                      },
                      {
                        week: "สัปดาห์ที่ 2",
                        packages: 289,
                        users: 34,
                        efficiency: 96,
                        trend: "up",
                      },
                      {
                        week: "สัปดาห์ที่ 3",
                        packages: 267,
                        users: 31,
                        efficiency: 93,
                        trend: "down",
                      },
                      {
                        week: "สัปดาห์ที่ 4",
                        packages: 312,
                        users: 42,
                        efficiency: 97,
                        trend: "up",
                      },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                          {item.week}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.packages}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.users}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {item.efficiency}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {item.trend === "up" ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
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
