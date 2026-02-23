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
} from "lucide-react";
import Navbar from "../navbar";
import Header from "../main_header";

export default function Analytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        const res = await fetch("https://30cc-124-122-9-179.ngrok-free.app/api/orders", {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error("Failed to load dashboard");
        const json = await res.json();
        // expected json shape: { metrics, userBehavior, trafficSources, topPerformers, packageDistribution, satisfaction, weeklyTrends }
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

            {/* Performance Metrics (data from API; show null when absent) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Metric 1 */}
              {(() => {
                const metrics = dashboardData?.metrics;
                const items = metrics || [
                  {
                    id: 1,
                    icon: Target,
                    title: "Conversion Rate",
                    value: null,
                    change: null,
                  },
                  {
                    id: 2,
                    icon: DollarSign,
                    title: "Average Revenue",
                    value: null,
                    change: null,
                  },
                  {
                    id: 3,
                    icon: Activity,
                    title: "Response Time",
                    value: null,
                    change: null,
                  },
                  {
                    id: 4,
                    icon: Zap,
                    title: "Efficiency Score",
                    value: null,
                    change: null,
                  },
                ];
                return items.map((m, i) => {
                  const Icon = m.icon || Target;
                  const change =
                    m.change === undefined || m.change === null
                      ? null
                      : m.change;
                  const changeNum = parseTrend(change);
                  const changeUp = changeNum > 0;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <span
                          className={`${changeNum >= 0 ? "text-green-600" : "text-red-600"} text-sm font-semibold flex items-center gap-1`}
                        >
                          {changeNum > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : changeNum < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <span className="w-4 h-4 inline-block" />
                          )}
                          {change === null || change === undefined
                            ? "null"
                            : String(change)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm font-medium">
                        {m.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {m.value === null || m.value === undefined
                          ? "null"
                          : m.value}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        เทียบกับเดือนที่แล้ว
                      </p>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* User Behavior Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  พฤติกรรมผู้ใช้งาน
                </h2>
                <div className="space-y-4">
                  {(() => {
                    const ub = dashboardData?.userBehavior;
                    const list = ub || [
                      { label: "รับพัสดุ", value: null, color: "bg-blue-500" },
                      {
                        label: "ตรวจสอบสถานะ",
                        value: null,
                        color: "bg-green-500",
                      },
                      {
                        label: "แจ้งปัญหา",
                        value: null,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "ติดต่อเจ้าหน้าที่",
                        value: null,
                        color: "bg-purple-500",
                      },
                    ];
                    return list.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {item.label}
                          </span>
                          <span className="text-sm font-semibold text-gray-800">
                            {item.value === null || item.value === undefined
                              ? "null"
                              : `${item.value}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full transition-all`}
                            style={{
                              width: `${item.value === null || item.value === undefined ? 0 : item.value}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  แหล่งที่มาของผู้ใช้
                </h2>
                <div className="space-y-4">
                  {(() => {
                    const ts = dashboardData?.trafficSources;
                    const list = ts || [
                      {
                        source: "Direct",
                        users: null,
                        percentage: null,
                        trend: null,
                      },
                      {
                        source: "Social Media",
                        users: null,
                        percentage: null,
                        trend: null,
                      },
                      {
                        source: "Email",
                        users: null,
                        percentage: null,
                        trend: null,
                      },
                      {
                        source: "Referral",
                        users: null,
                        percentage: null,
                        trend: null,
                      },
                    ];
                    return list.map((item, index) => {
                      const trendNum = parseTrend(item.trend);
                      const trendUp = trendNum > 0;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">
                              {item.source}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.users === null || item.users === undefined
                                ? "null"
                                : `${item.users} users`}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-800">
                                {item.percentage === null ||
                                item.percentage === undefined
                                  ? "null"
                                  : `${item.percentage}%`}
                              </p>
                              <p
                                className={`text-xs font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}
                              >
                                {item.trend === null || item.trend === undefined
                                  ? "0"
                                  : String(item.trend)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
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
                  {(() => {
                    const tp = dashboardData?.topPerformers;
                    const list = tp || [
                      { name: null, score: null, packages: null },
                      { name: null, score: null, packages: null },
                      { name: null, score: null, packages: null },
                      { name: null, score: null, packages: null },
                    ];
                    return list.map((person, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-[#1B00BF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">
                            {person.name === null || person.name === undefined
                              ? "null"
                              : person.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {person.packages === null ||
                            person.packages === undefined
                              ? "null"
                              : `${person.packages} packages`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#1B00BF]">
                            {person.score === null || person.score === undefined
                              ? "null"
                              : person.score}
                          </p>
                          <p className="text-xs text-gray-500">score</p>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Package Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  การกระจายพัสดุ
                </h2>
                <div className="space-y-3">
                  {(() => {
                    const pd = dashboardData?.packageDistribution;
                    const list = pd || [
                      { type: "Express", count: null, color: "bg-red-500" },
                      { type: "Standard", count: null, color: "bg-blue-500" },
                      { type: "Economy", count: null, color: "bg-green-500" },
                      {
                        type: "International",
                        count: null,
                        color: "bg-purple-500",
                      },
                    ];
                    return list.map((item, index) => (
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
                          {item.count === null || item.count === undefined
                            ? "null"
                            : item.count}
                        </p>
                      </div>
                    ));
                  })()}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {dashboardData?.packageDistributionTotal ?? "null"}
                    </span>
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
                        {dashboardData?.satisfaction?.rating ?? "null"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">จาก 5 คะแนน</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dashboardData?.satisfaction?.reviews ?? "null"} reviews
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  {(
                    dashboardData?.satisfaction?.breakdown ?? [
                      null,
                      null,
                      null,
                      null,
                      null,
                    ]
                  ).map((pct, idx) => {
                    const star = 5 - idx;
                    const width = pct === null || pct === undefined ? 0 : pct;
                    const label =
                      pct === null || pct === undefined ? "null" : `${pct}%`;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-8">
                          {star} ⭐
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${width}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-10 text-right">
                          {label}
                        </span>
                      </div>
                    );
                  })}
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
                    {(
                      dashboardData?.weeklyTrends ?? [null, null, null, null]
                    ).map((item, index) => {
                      const row = item || {
                        week: null,
                        packages: null,
                        users: null,
                        efficiency: null,
                        trend: null,
                      };
                      // trend default to 0 per request; if trend is 'up'/'down' convert to numeric sign
                      const trendRaw = row.trend;
                      let trendVal = 0;
                      if (trendRaw === "up") trendVal = 1;
                      else if (trendRaw === "down") trendVal = -1;
                      else if (typeof trendRaw === "number")
                        trendVal = trendRaw;
                      else trendVal = parseTrend(trendRaw);
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm font-medium text-gray-800">
                            {row.week === null || row.week === undefined
                              ? "null"
                              : row.week}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {row.packages === null || row.packages === undefined
                              ? "null"
                              : row.packages}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {row.users === null || row.users === undefined
                              ? "null"
                              : row.users}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              {row.efficiency === null ||
                              row.efficiency === undefined
                                ? "null"
                                : `${row.efficiency}%`}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {trendVal > 0 ? (
                              <TrendingUp className="w-5 h-5 text-green-500" />
                            ) : trendVal < 0 ? (
                              <TrendingDown className="w-5 h-5 text-red-500" />
                            ) : (
                              <span className="text-xs text-gray-500">0</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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
