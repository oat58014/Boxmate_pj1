import React, { useState, useEffect } from "react";
import {
  Package, Search, Plus, Edit, Trash2, AlertCircle, X, Save,
} from "lucide-react";
import Navbar from "../navbar";
import Header from "../main_header";

const BASE_URL = "https://suitably-nonbeneficed-marisol.ngrok-free.dev/api";
const FETCH_HEADERS = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json",
};

// ========== Modal ==========
function ProductModal({ mode, product, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState({
    product_id:    "",
    sku:           "",
    Product_name:  "",
    price:         "",
    Product_stock: "",
    category:      "General",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && product) {
      setForm({
        product_id:    product.product_id    ?? "",
        sku:           product.sku           ?? "",
        Product_name:  product.Product_name  ?? "",
        price:         product.price         ?? "",
        Product_stock: product.Product_stock ?? "",
        category:      product.category      ?? "General",
      });
    }
  }, [isEdit, product]);

  const validate = () => {
    const e = {};
    if (!form.Product_name.trim()) e.Product_name = "กรุณากรอกชื่อสินค้า";
    if (form.Product_stock === "" || isNaN(Number(form.Product_stock)))
      e.Product_stock = "กรุณากรอกจำนวนเป็นตัวเลข";
    if (form.price !== "" && isNaN(Number(form.price)))
      e.price = "ราคาต้องเป็นตัวเลข";
    return e;
  };

  const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length > 0) { setErrors(e); return; }

  // ถ้าเป็น Edit แต่ไม่มี SKU → แจ้งเตือน
  if (isEdit && !form.sku.trim()) {
    setErrors({ sku: "ต้องกรอก SKU เพื่ออัปเดตสต็อก" });
    return;
  }

  setSaving(true);
  try {
    if (isEdit) {
      // ใช้ update_stock API
      const res = await fetch(`${BASE_URL}/product/update_stock`, {
        method: "POST",
        headers: FETCH_HEADERS,
        body: JSON.stringify({
          sku:       form.sku,
          new_stock: Number(form.Product_stock),
        }),
      });
      if (!res.ok) throw new Error(`อัปเดตไม่สำเร็จ (${res.status})`);
    } else {
      // เพิ่มสินค้าใหม่ (ยังใช้ endpoint เดิมไว้ก่อน)
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: FETCH_HEADERS,
        body: JSON.stringify({
          ...form,
          Product_stock: Number(form.Product_stock),
          price: form.price !== "" ? Number(form.price) : null,
        }),
      });
      if (!res.ok) throw new Error(`เพิ่มสินค้าไม่สำเร็จ (${res.status})`);
    }

    // อัปเดต state ฝั่ง frontend
    onSave(form, isEdit, product?._index);
    onClose();
  } catch (err) {
    setErrors({ api: err.message });
  } finally {
    setSaving(false);
  }
};

  const fields = [
    { key: "product_id",    label: "รหัสสินค้า",      type: "text",   placeholder: "PRD-001",  required: false },
    { key: "sku",           label: "SKU",              type: "text",   placeholder: "SKU-001",  required: false },
    { key: "Product_name",  label: "ชื่อสินค้า *",    type: "text",   placeholder: "ชื่อสินค้า", required: true },
    { key: "price",         label: "ราคา (บาท)",      type: "number", placeholder: "0",        required: false },
    { key: "Product_stock", label: "จำนวนสต็อก *",   type: "number", placeholder: "0",        required: true  },
    { key: "category",      label: "หมวดหมู่",        type: "text",   placeholder: "General",  required: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-lg font-bold text-gray-800">
            {isEdit ? "✏️ แก้ไขสินค้า" : "➕ เพิ่มสินค้าใหม่"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          {errors.api && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">❌ {errors.api}</p>
          )}

          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, [key]: e.target.value }));
                  setErrors((prev) => ({ ...prev, [key]: undefined }));
                }}
                className={`w-full px-4 py-2 border rounded-lg text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#1B00BF] focus:border-transparent
                  ${errors[key] ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              />
              {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
            </div>
          ))}

          {/* Read-only info ตอน edit */}
          {isEdit && (
            <div className="bg-gray-50 rounded-lg px-4 py-3 text-xs text-gray-500 space-y-1">
              <p>คงเหลือ: <span className="font-medium text-gray-700">{product.stock_remaining?.toLocaleString("th-TH")}</span></p>
              <p>จอง: <span className="font-medium text-gray-700">{product.stock_reserved?.toLocaleString("th-TH")}</span></p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#1B00BF]
                       hover:bg-[#1500a0] rounded-lg transition-colors
                       flex items-center gap-2 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ========== Main ==========
export default function Stock() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stockData, setStockData]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [searchTerm, setSearchTerm]       = useState("");
  const [modal, setModal]                 = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true); setError(null);
        const res = await fetch(`${BASE_URL}/products`, {
          signal: ac.signal,
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        const json = await res.json();
        let arr = Array.isArray(json) ? json : (json?.data ?? []);
        setStockData(arr.map((item, i) => ({
          ...item,
          // field ที่ API ยังไม่มี ใส่ค่าเริ่มต้นไว้ก่อน
          product_id: item.product_id ?? null,
          sku:        item.sku        ?? null,
          price:      item.price      ?? null,
          _index: i,
        })));
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  const handleSave = (saved, isEdit, editIndex) => {
  if (isEdit) {
    setStockData((prev) =>
      prev.map((item) =>
        item._index === editIndex
          ? {
              ...item,
              sku:           saved.sku,
              product_id:    saved.product_id,
              price:         saved.price !== "" ? Number(saved.price) : null,
              Product_name:  saved.Product_name,
              Product_stock: Number(saved.Product_stock),
              category:      saved.category,
            }
          : item
      )
    );
  } else {
    setStockData((prev) => [{ ...saved, _index: Date.now() }, ...prev]);
  }
};

  const getStatusBadge = (qty) => {
    if (qty === 0) return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">หมด</span>;
    if (qty < 10)  return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">ใกล้หมด</span>;
    return              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">มีสินค้า</span>;
  };

  const filtered = stockData.filter((item) =>
    item.Product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.product_id ?? "").includes(searchTerm)
  );

  const summary = {
    total:      stockData.length,
    inStock:    stockData.filter((i) => i.stock_remaining >= 10).length,
    lowStock:   stockData.filter((i) => i.stock_remaining > 0 && i.stock_remaining < 10).length,
    outOfStock: stockData.filter((i) => i.stock_remaining === 0).length,
  };

  const summaryCards = [
    { label: "สินค้าทั้งหมด", value: summary.total,      colorClass: "bg-blue-100",   iconColor: "text-blue-600"   },
    { label: "มีสินค้า",      value: summary.inStock,    colorClass: "bg-green-100",  iconColor: "text-green-600"  },
    { label: "ใกล้หมด",       value: summary.lowStock,   colorClass: "bg-yellow-100", iconColor: "text-yellow-600" },
    { label: "หมดสต็อก",      value: summary.outOfStock, colorClass: "bg-red-100",    iconColor: "text-red-600"    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Stock Management 📦</h1>
              <p className="text-gray-600">จัดการสินค้าในสต็อก</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {summaryCards.map(({ label, value, colorClass, iconColor }) => (
                <div key={label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">{label}</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                    </div>
                    <div className={`${colorClass} p-3 rounded-lg`}>
                      <Package className={`w-6 h-6 ${iconColor}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search & Add */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 w-full md:max-w-md relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="ค้นหา (ชื่อ, SKU, รหัสสินค้า, หมวดหมู่)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-[#1B00BF]"
                  />
                </div>
                <button
                  onClick={() => setModal({ mode: "add" })}
                  className="bg-[#1B00BF] hover:bg-[#1500a0] text-white px-4 py-2 rounded-lg
                             flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>เพิ่มสินค้า</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {loading ? (
                <p className="text-gray-500 text-center py-12">⏳ กำลังโหลดข้อมูล...</p>
              ) : error ? (
                <p className="text-red-600 text-center py-12">❌ {error}</p>
              ) : filtered.length === 0 ? (
                <p className="text-gray-500 text-center py-12">ไม่พบสินค้า</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {["รหัสสินค้า", "SKU", "ชื่อสินค้า", "หมวดหมู่", "ราคา", "สต็อกรวม", "คงเหลือ", "จอง", "สถานะ", "การดำเนินการ"].map((h) => (
                          <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item) => (
                        <tr key={item._index} className="border-b border-gray-100 hover:bg-gray-50">
                          {/* รหัสสินค้า */}
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {item.product_id
                              ? <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{item.product_id}</span>
                              : <span className="text-gray-300 text-xs">—</span>}
                          </td>
                          {/* SKU */}
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {item.sku
                              ? <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{item.sku}</span>
                              : <span className="text-gray-300 text-xs">—</span>}
                          </td>
                          {/* ชื่อสินค้า */}
                          <td className="py-3 px-4 text-sm font-medium text-gray-800 max-w-[220px] truncate">
                            {item.Product_name}
                          </td>
                          {/* หมวดหมู่ */}
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                              {item.category}
                            </span>
                          </td>
                          {/* ราคา */}
                          <td className="py-3 px-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                            {item.price != null
                              ? `฿${Number(item.price).toLocaleString("th-TH")}`
                              : <span className="text-gray-300 text-xs">—</span>}
                          </td>
                          {/* สต็อกรวม */}
                          <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                            {item.Product_stock?.toLocaleString("th-TH")}
                          </td>
                          {/* คงเหลือ */}
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {item.stock_remaining?.toLocaleString("th-TH")}
                          </td>
                          {/* จอง */}
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {item.stock_reserved?.toLocaleString("th-TH")}
                          </td>
                          {/* สถานะ */}
                          <td className="py-3 px-4">
                            {getStatusBadge(item.stock_remaining)}
                          </td>
                          {/* Actions */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setModal({ mode: "edit", product: item })}
                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                title="แก้ไข"
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                              </button>
                              <button
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="ลบ"
                              >
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

      {modal && (
        <ProductModal
          mode={modal.mode}
          product={modal.product}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}