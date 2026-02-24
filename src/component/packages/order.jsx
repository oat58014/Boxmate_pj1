import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";
import Navbar from "../navbar";
import Header from "../main_header";

export default function Order() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusFilters = [
    { id: "all", label: "ทั้งหมด" },
    { id: "pending", label: "รอดำเนินการ" },
    { id: "processing", label: "กำลังดำเนินการ" },
    { id: "shipping", label: "กำลังจัดส่ง" },
    { id: "completed", label: "สำเร็จ" },
    { id: "cancelled", label: "ยกเลิก" },
  ];

  // stock/order data — will be populated from API; keep an empty array initially
  const [orderData, setOrderData] = useState([]);

  // fallback addresses for randomization
  const sampleAddresses = [
    "123 ถนนสุขุมวิท กรุงเทพฯ 10110",
    "456 ถนนพระราม 4 กรุงเทพฯ 10500",
    "789 ถนนรัชดาภิเษก กรุงเทพฯ 10400",
    "321 ถนนพหลโยธิน กรุงเทพฯ 10220",
    "654 ถนนเพชรบุรี กรุงเทพฯ 10400",
    "987 ถนนศรีนครินทร์ กรุงเทพฯ 10250",
    "147 ถนนลาดพร้าว กรุงเทพฯ 10230",
    "258 ถนนงามวงศ์วาน กรุงเทพฯ 10900",
  ];

  useEffect(() => {
    const ac = new AbortController();
    async function loadOrders() {
      try {
        setLoading(true);
        setError(null);
        // TODO: Add auth header if API requires it (uncomment and add token):
        // headers: { Authorization: 'Bearer YOUR_TOKEN' }
        const res = await fetch("https://ad70-203-131-216-119.ngrok-free.app/api/orders", { 
          signal: ac.signal,
          headers: {
            "ngrok-skip-browser-warning": "true",
            // "Authorization": "Bearer YOUR_TOKEN_HERE"
          }
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        
        const contentType = res.headers.get("content-type") || "";
        let data;
        if (contentType.includes("application/json")) {
          try {
            data = await res.json();
          } catch (e) {
            const text = await res.text();
            throw new Error("Invalid JSON response: " + (text ? text.slice(0, 200) : "(empty)"));
          }
        } else {
          const text = await res.text();
          console.error("❌ API returned HTML, not JSON. Response preview:", text.slice(0, 300));
          throw new Error(
            `API returned ${contentType || "text/html"} instead of JSON. Check browser console for details. May need auth header.`
          );
        }

        if (!Array.isArray(data)) {
          if (data && Array.isArray(data.data)) {
            data = data.data;
          } else {
            setOrderData([]);
            return;
          }
        }

        const mapped = data.map((o) => {
          const items = Math.floor(Math.random() * 6) + 1;
          const address = sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)];
          const dt = o.created_at ? new Date(o.created_at) : null;
          const thaiDate = dt ? dt.toLocaleString("th-TH", { timeZone: "Asia/Bangkok", hour12: false }) : null;
          
          // map API status to UI status
          const statusMap = {
            "packed": "processing",
            "ready_to_ship": "shipping",
            "delivered": "completed",
            "canceled": "cancelled",
            "CANCELLED": "cancelled",
            "unpaid": "pending",
            "pending": "pending",
            "processing": "processing",
            "shipping": "shipping",
            "completed": "completed",
            "cancelled": "cancelled",
          };
          
          return {
            id: o.order_id || null,
            customer: o.customer_name || null,
            items,
            total: o.amount !== undefined && o.amount !== null ? `฿${Number(o.amount).toLocaleString("th-TH")}` : null,
            status: statusMap[o.status] || o.status || "pending",
            date: thaiDate,
            address,
            platform: o.platform || null,
          };
        });

        setOrderData(mapped);
      } catch (err) {
        if (err.name === 'AbortError') {
          // fetch was aborted by cleanup; ignore
          return;
        }
        console.error(err);
        setOrderData([]);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
    return () => ac.abort();
  }, []);

  const filteredOrders =
    selectedStatus === "all"
      ? orderData
      : orderData.filter((order) => order.status === selectedStatus);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "รอดำเนินการ",
        icon: Clock,
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "กำลังดำเนินการ",
        icon: Package,
      },
      shipping: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        label: "กำลังจัดส่ง",
        icon: ShoppingCart,
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "สำเร็จ",
        icon: CheckCircle,
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "ยกเลิก",
        icon: XCircle,
      },
    };

    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: status || "ไม่ระบุ",
      icon: Package,
    };
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const orderSummary = {
    total: orderData.length,
    pending: orderData.filter((order) => order.status === "pending").length,
    processing: orderData.filter((order) => order.status === "processing")
      .length,
    shipping: orderData.filter((order) => order.status === "shipping").length,
    completed: orderData.filter((order) => order.status === "completed").length,
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

        {/* Order Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Order Management 🛒
              </h1>
              <p className="text-gray-600">จัดการคำสั่งซื้อทั้งหมด</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">ทั้งหมด</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {orderSummary.total}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">รอ</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {orderSummary.pending}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      ดำเนินการ
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {orderSummary.processing}
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
                    <p className="text-gray-500 text-sm font-medium">จัดส่ง</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {orderSummary.shipping}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">สำเร็จ</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {orderSummary.completed}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
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
                      placeholder="ค้นหาคำสั่งซื้อ..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-[#1B00BF] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Status Filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedStatus(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedStatus === filter.id
                        ? "bg-[#1B00BF] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading / Error / Empty states */}
            {loading && (
              <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded">กำลังโหลดคำสั่งซื้อ...</div>
            )}
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded">ข้อผิดพลาด: {error}</div>
            )}
            {!loading && !error && orderData.length === 0 && (
              <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded">ไม่มีคำสั่งซื้อ</div>
            )}

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        รหัสคำสั่งซื้อ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        ลูกค้า
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        รายการ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        ยอดรวม
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        แพลตฟอร์ม
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        สถานะ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        วันที่สั่ง
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        การดำเนินการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                          {order.id}
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {order.customer}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.address}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {order.items} รายการ
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                          {order.total}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {order.platform === null || order.platform === undefined ? 'null' : order.platform}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {order.date}
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-blue-600" />
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
