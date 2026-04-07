import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Download,
  BarChart3,
} from "lucide-react";
import Navbar from "../navbar";
import Header from "../main_header";
import { showToast } from "../../utils/toastNotification";

export default function Stat() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("this");
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
        <main className="flex-1 overflow-y-auto bg-white p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Dashboard &gt; Analytics</p>
                  <h1 className="text-4xl font-bold text-[#1B00BF]">
                    Sales Forecasting
                  </h1>
                  <p className="text-gray-600 mt-2">
                    (การทำนายยอดขาย)
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50">
                    Next 7
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50">
                    Next 30
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50">
                    Next Quarter
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Leverage machine learning to anticipate market shifts and optimize your supply chain with high-precision demand forecasting.
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-3 mb-8">
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Projected Revenue */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">PROJECTED REVENUE</p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 text-sm font-bold">↑12.4%</span>
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  ฿1,420,500
                </p>
                <p className="text-gray-600 text-xs">
                  Estimated for the next 7 days based on seasonal trends.
                </p>
              </div>

              {/* Projected Sales Volume */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">PROJECTED SALES VOLUME</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  8,240 <span className="text-2xl text-gray-600">Units</span>
                </p>
                <p className="text-gray-600 text-xs">
                  Contribution rate and expected across distribution channels.
                </p>
              </div>

              {/* Model Reliability */}
              <div className="bg-[#1B00BF] rounded-xl p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium">MODEL RELIABILITY</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-5xl font-bold mb-2">92%</p>
                <p className="text-white/80 text-xs">
                  Confidence Score
                </p>
                <p className="text-white/70 text-xs mt-2">
                  Based on 24 months of historical data and current market volatility indices.
                </p>
              </div>
            </div>

            {/* Sales Trend Analysis Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sales Trend Analysis</h2>
                  <p className="text-gray-600 text-sm mt-1">Historical actuals vs Machine learning projection</p>
                </div>
                <div className="flex items-center gap-4">
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
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Actual Sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#1B00BF] rounded-full"></div>
                      <span className="text-sm text-gray-600">AI Predicted</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-100 p-6">
                {/* Simple bar chart visualization with mock data */}
                <div className="flex items-end justify-between w-full gap-2" style={{ height: '300px' }}>
                  {(selectedMonth === "this"
                    ? [
                        { date: "Mar 29", actual: 75, predicted: 48 },
                        { date: "Mar 30", actual: 88, predicted: 55 },
                        { date: "Mar 31", actual: 92, predicted: 60 },
                        { date: "TODAY", actual: 62, predicted: 70, highlight: true },
                        { date: "Apr 2", actual: 0, predicted: 65 },
                        { date: "Apr 3", actual: 0, predicted: 68 },
                        { date: "Apr 4", actual: 0, predicted: 72 },
                        { date: "Apr 5", actual: 0, predicted: 75 },
                      ]
                    : [
                        { date: "Oct", actual: 68, predicted: 0 },
                        { date: "Nov", actual: 72, predicted: 0 },
                        { date: "Decr", actual: 65, predicted: 0 },
                        { date: "Jan", actual: 55, predicted: 0 },
                        { date: "Feb", actual: 68, predicted: 0 },
                        { date: "Mar", actual: 72, predicted: 0 },
                        { date: "Apr", actual: 65, predicted: 0 },
                      ]
                  ).map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1">
                      <div className="flex gap-1 items-end justify-center h-full w-full">
                        {item.actual > 0 && (
                          <div
                            className="flex-1 bg-gray-400 rounded-t"
                            style={{ height: `${(item.actual / 100) * 250}px` }}
                            title={`Actual: ${item.actual}%`}
                          ></div>
                        )}
                        {item.actual === 0 && item.predicted > 0 && (
                          <div
                            className="flex-1 rounded-t bg-[#1B00BF]"
                            style={{ height: `${(item.predicted / 100) * 250}px` }}
                            title={`Predicted: ${item.predicted}%`}
                          ></div>
                        )}
                      </div>
                      <span className={`text-xs font-semibold text-center mt-3 ${item.highlight ? 'text-[#1B00BF]' : 'text-gray-600'}`}>
                        {item.date}
                      </span>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inventory Optimization Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Inventory Optimization (การปรับปรุงสตอก)
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 text-[#1B00BF] hover:bg-blue-50 rounded-lg font-medium text-sm">
                  <Download className="w-4 h-4" />
                  Export Recommendations
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Recommendations for low stock and high-demand products based on predictive analysis.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">PRODUCT INFORMATION</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">CURRENT STOCK</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">PREDICTED DEMAND</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">STATUS / ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate("/packages/stock")}
                    >
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">IMG</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Luxe Chronograph Series X</p>
                            <p className="text-xs text-gray-500">Electronics • SKU: ECH-501</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-gray-900 font-medium">42 Units</td>
                      <td className="py-6 px-4">
                        <span className="text-red-600 font-bold">128 Units</span>
                        <span className="text-red-600 text-xs ml-1">Expected Gap</span>
                      </td>
                      <td className="py-6 px-4">
                        <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium">REORDER NOW</span>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">IMG</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Aura Noise Cancelling Pods</p>
                            <p className="text-xs text-gray-500">Audio • Mic: Audio-922</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-gray-900 font-medium">156 Units</td>
                      <td className="py-6 px-4">
                        <span className="text-teal-600 font-bold">140 Units</span>
                      </td>
                      <td className="py-6 px-4">
                        <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">OPTIMIZED</span>
                      </td>
                    </tr>

                    <tr 
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate("/packages/stock")}
                    >
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">IMG</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Velocity Pro Run - Red</p>
                            <p className="text-xs text-gray-500">Apparel • SKU: APP-630</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-gray-900 font-medium">88 Units</td>
                      <td className="py-6 px-4">
                        <span className="text-blue-600 font-bold">112 Units</span>
                      </td>
                      <td className="py-6 px-4">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">REORDER IN 3 DAYS</span>
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
