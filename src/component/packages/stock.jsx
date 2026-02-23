import React, { useState, useEffect } from "react";
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react";
import Navbar from "../navbar";
import Header from "../main_header";

export default function Stock() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    
    async function loadStock() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          "https://30cc-124-122-9-179.ngrok-free.app/api/products",
          {
            signal: ac.signal,
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch stock data");

        const contentType = res.headers.get("content-type") || "";
        let data;
        if (contentType.includes("application/json")) {
          try {
            data = await res.json();
          } catch (e) {
            const text = await res.text();
            throw new Error(
              "Invalid JSON response: " + (text ? text.slice(0, 200) : "(empty)")
            );
          }
        } else {
          const text = await res.text();
          console.error(
            "❌ API returned HTML, not JSON. Response preview:",
            text.slice(0, 300)
          );
          throw new Error(
            `API returned ${
              contentType || "text/html"
            } instead of JSON. Check browser console for details.`
          );
        }

        if (!Array.isArray(data)) {
          if (data && Array.isArray(data.data)) {
            data = data.data;
          } else {
            setStockData([]);
            return;
          }
        }

        const mapped = data.map((item) => {
          const dt = item.updated_at ? new Date(item.updated_at) : null;
          const thaiDate = dt
            ? dt.toLocaleString("th-TH", {
                timeZone: "Asia/Bangkok",
                hour12: false,
              })
            : null;

          return {
            product_id: item.product_id || null,
            sku: item.sku || null,
            name: item.name || null,
            price: item.price ? `฿${Number(item.price).toLocaleString("th-TH")}` : null,
            stock_quantity: item.stock_quantity || 0,
            updated_at: thaiDate,
            platform: item.platform || null,
          };
        });

        setStockData(mapped);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          console.error("❌ Error loading stock:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadStock();
    return () => ac.abort();
  }, []);

  const getStatusBadge = (quantity) => {
    if (quantity === 0) {
      return (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          หมด
        </span>
      );
    } else if (quantity < 10) {
      return (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          ใกล้หมด
        </span>
      );
    } else {
      return (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          มีสินค้า
        </span>
      );
    }
  };

  const filteredStock = stockData.filter(
    (item) =>
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.product_id && item.product_id.includes(searchTerm)) ||
      (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stockSummary = {
    total: stockData.length,
    inStock: stockData.filter((item) => item.stock_quantity >= 10).length,
    lowStock: stockData.filter(
      (item) => item.stock_quantity > 0 && item.stock_quantity < 10
    ).length,
    outOfStock: stockData.filter((item) => item.stock_quantity === 0).length,
  };

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

        {/* Stock Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Stock Management 📦
              </h1>
              <p className="text-gray-600">จัดการสินค้าในสต็อก</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      สินค้าทั้งหมด
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {stockSummary.total}
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
                      มีสินค้า
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {stockSummary.inStock}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">ใกล้หมด</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {stockSummary.lowStock}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      หมดสต็อก
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {stockSummary.outOfStock}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Search */}
                <div className="flex-1 w-full md:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="ค้นหาสินค้า (ชื่อ, รหัส, SKU)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-[#1B00BF] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Add Button */}
                <button
                  className="bg-[#1B00BF] hover:bg-[#1500a0] text-white px-4 py-2 rounded-lg
                                 flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>เพิ่มสินค้า</span>
                </button>
              </div>
            </div>

            {/* Stock Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {loading ? (
                <p className="text-gray-600 text-center py-8">กำลังโหลดข้อมูล...</p>
              ) : error ? (
                <p className="text-red-600 text-center py-8">❌ {error}</p>
              ) : filteredStock.length === 0 ? (
                <p className="text-gray-600 text-center py-8">ไม่มีข้อมูล</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          รหัสสินค้า
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          ชื่อสินค้า
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          ราคา
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          จำนวน
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          สถานะ
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          อัปเดตล่าสุด
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          การดำเนินการ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStock.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm font-medium text-gray-800">
                            <div>{item.product_id}</div>
                            {item.sku && (
                              <div className="text-xs text-gray-500">{item.sku}</div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                            {item.price}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                            {item.stock_quantity}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(item.stock_quantity)}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {item.updated_at}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-blue-600" />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
