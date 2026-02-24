import React, { useState } from "react";
import { User, MapPin, Video, ShoppingCart, Link as LinkIcon } from "lucide-react";
import Navbar from "./navbar";
import Header from "./main_header";

export default function UserProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const externalLinks = [
    { id: "tiktok", label: "TikTok", href: "https://ad70-203-131-216-119.ngrok-free.app/api/auth/tiktok", icon: Video },
    { id: "lazada", label: "Lazada", href: "https://ad70-203-131-216-119.ngrok-free.app/api/auth/lazada", icon: ShoppingCart },
    // { id: "shopee", label: "Shopee", href: "https://shopee.co.th/", icon: ShoppingCart },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-10 border border-gray-200 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <img
                  src="https://www.boontavorn.com/wp-content/uploads/2020/01/logo-boontavorn.png"
                  alt="บุญถาวร"
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-gray-100 shadow-lg bg-white p-2"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-extrabold text-gray-900">บุญถาวร</h1>
                <p className="text-lg text-gray-600 mt-2 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  สำนักงานใหญ่: กรุงเทพมหานคร, ประเทศไทย
                </p>

                <p className="mt-4 text-gray-700 max-w-2xl">
                  บุญถาวร — ร้านวัสดุก่อสร้างและของตกแต่งบ้านชื่อดังในประเทศไทย ให้บริการวัสดุก่อสร้าง อุปกรณ์เครื่องใช้ และบริการออกแบบ ติดตั้งครบวงจร
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {externalLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#f3f4ff] hover:bg-[#e9e7ff] rounded-xl text-sm font-medium text-gray-900 transition-colors shadow-sm"
                      >
                        <Icon className="w-5 h-5 text-[#1B00BF]" />
                        <span className="font-semibold">{link.label}</span>
                        <LinkIcon className="w-3 h-3 text-gray-400 ml-1" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="w-full md:w-auto text-right">
                <button className="px-6 py-3 bg-[#1B00BF] text-white rounded-xl text-sm font-semibold shadow">แก้ไขโปรไฟล์</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
