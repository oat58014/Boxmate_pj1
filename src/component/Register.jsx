import React from "react";
import Logo from "../image/boxmateLogo1.jpg";

export default function Component() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1B00BF]">
      {/* MOBILE RESPONSIVE*/}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo สำหรับ Mobile */}
        <img className="w-32 h-auto mb-8" src={Logo} alt="Boxmate Logo" />

        {/* Form สำหรับ Mobile */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm border border-white/20 shadow-2xl">
          <h2 className="text-white text-2xl font-bold mb-2 text-center">
            Sign Up
          </h2>
          <p className="text-white/70 text-xs mb-5 text-center">
            สร้างบัญชีของคุณ
          </p>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-white text-xs font-medium block mb-1.5">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/30
                         text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2
                         focus:ring-[#1B00BF] focus:border-transparent transition"
                placeholder="กรอกชื่อ-นามสกุล"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-white text-xs font-medium block mb-1.5">
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/30
                         text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2
                         focus:ring-[#1B00BF] focus:border-transparent transition"
                placeholder="example@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-white text-xs font-medium block mb-1.5">
                รหัสผ่าน
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/30
                         text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2
                         focus:ring-[#1B00BF] focus:border-transparent transition"
                placeholder="อย่างน้อย 6 ตัวอักษร"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-white text-xs font-medium block mb-1.5">
                ยืนยันรหัสผ่าน
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/30
                         text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2
                         focus:ring-[#1B00BF] focus:border-transparent transition"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1B00BF] hover:bg-[#1500a0] text-white font-semibold
                       py-2.5 px-4 rounded-lg transition duration-200 transform
                       hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm"
            >
              ลงทะเบียน
            </button>

            {/* Login Link */}
            <p className="text-white/70 text-sm text-center mt-4">
              มีบัญชีอยู่แล้ว?{" "}
              <a href="/login" className="...">
                เข้าสู่ระบบ
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* WEB-APP (Desktop)*/}
      <div className="hidden md:block relative h-screen overflow-hidden">
        {/* Left-side*/}
        <div
          className="absolute inset-0 bg-[#1B00BF]
          [clip-path:polygon(0_0,55%_0,25%_100%,0_100%)]"
        >
          <div className="flex items-center justify-center h-full ml-20">
            <img className="w-64 h-auto" src={Logo} alt="Boxmate Logo" />
          </div>
        </div>

        {/* Right side*/}
        <div
          className="absolute inset-0 bg-black
          [clip-path:polygon(55%_0,100%_0,100%_100%,25%_100%)]"
        ></div>

        {/* REGISTER FORM (Desktop)*/}
        <div className="absolute inset-0 z-10 flex items-center justify-end pr-32">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
            <h2 className="text-white text-3xl font-bold mb-2 text-center">
              Sign Up
            </h2>
            <p className="text-white/70 text-sm mb-6 text-center">
              สร้างบัญชีของคุณ
            </p>

            <form className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-white text-sm font-medium block mb-2">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30
                           text-white placeholder-white/50 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="กรอกชื่อ-นามสกุล"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-white text-sm font-medium block mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30
                           text-white placeholder-white/50 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="example@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-white text-sm font-medium block mb-2">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30
                           text-white placeholder-white/50 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-white text-sm font-medium block mb-2">
                  ยืนยันรหัสผ่าน
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30
                           text-white placeholder-white/50 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1B00BF] hover:bg-[#1500a0] text-white font-semibold
                         py-3 px-4 rounded-lg transition duration-200 transform
                         hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                ลงทะเบียน
              </button>

              {/* Login Link */}
              <p className="text-white/70 text-sm text-center mt-4">
                มีบัญชีอยู่แล้ว?{" "}
                <a href="/login" className="...">
                  เข้าสู่ระบบ
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
