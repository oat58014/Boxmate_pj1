import React, { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "ทั้งหมด" },
    { id: "electronics", label: "อิเล็กทรอนิกส์" },
    { id: "clothing", label: "เสื้อผ้า" },
    { id: "food", label: "อาหาร" },
    { id: "books", label: "หนังสือ" },
    { id: "others", label: "อื่นๆ" },
  ];

  const stockData = [
    {
      id: "STK001",
      name: "iPhone 15 Pro",
      category: "electronics",
      quantity: 45,
      status: "in-stock",
      location: "A-01",
      lastUpdate: "12/02/2026",
    },
    {
      id: "STK002",
      name: "เสื้อยืดผ้าฝ้าย",
      category: "clothing",
      quantity: 120,
      status: "in-stock",
      location: "B-05",
      lastUpdate: "12/02/2026",
    },
    {
      id: "STK003",
      name: "MacBook Air M3",
      category: "electronics",
      quantity: 8,
      status: "low-stock",
      location: "A-03",
      lastUpdate: "11/02/2026",
    },
    {
      id: "STK004",
      name: "ขนมปัง",
      category: "food",
      quantity: 0,
      status: "out-of-stock",
      location: "C-12",
      lastUpdate: "10/02/2026",
    },
    {
      id: "STK005",
      name: "หนังสือ React Guide",
      category: "books",
      quantity: 67,
      status: "in-stock",
      location: "D-08",
      lastUpdate: "12/02/2026",
    },
    {
      id: "STK006",
      name: "AirPods Pro",
      category: "electronics",
      quantity: 15,
      status: "low-stock",
      location: "A-02",
      lastUpdate: "11/02/2026",
    },
    {
      id: "STK007",
      name: "กางเกงยีนส์",
      category: "clothing",
      quantity: 89,
      status: "in-stock",
      location: "B-07",
      lastUpdate: "12/02/2026",
    },
    {
      id: "STK008",
      name: "กาแฟสำเร็จรูป",
      category: "food",
      quantity: 234,
      status: "in-stock",
      location: "C-03",
      lastUpdate: "12/02/2026",
    },
  ];

  const filteredStock =
    selectedCategory === "all"
      ? stockData
      : stockData.filter((item) => item.category === selectedCategory);

  const getStatusBadge = (status) => {
    if (status === "in-stock") {
      return (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          มีสินค้า
        </span>
      );
    } else if (status === "low-stock") {
      return (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          ใกล้หมด
        </span>
      );
    } else {
      return (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          หมดสต็อก
        </span>
      );
    }
  };

  const stockSummary = {
    total: stockData.length,
    inStock: stockData.filter((item) => item.status === "in-stock").length,
    lowStock: stockData.filter((item) => item.status === "low-stock").length,
    outOfStock: stockData.filter((item) => item.status === "out-of-stock")
      .length,
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
                      placeholder="ค้นหาสินค้า..."
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

              {/* Categories */}
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-[#1B00BF] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                        จำนวน
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        ตำแหน่ง
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
                          {item.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.location}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.lastUpdate}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
