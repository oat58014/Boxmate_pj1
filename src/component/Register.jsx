import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../image/boxmateLogo1.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ตรวจสอบว่า password ตรงกัน
    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // ตรวจสอบว่าเติมข้อมูลครบ
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      // TODO: ส่งข้อมูลไปยัง API ที่นี่
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
      
      console.log("ข้อมูลการลงทะเบียน:", registrationData);

      // จำลองการปิด loading และ navigate
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registrationData)
      // });

      // สำเร็จแล้ว ไปหน้า login
      navigate("/");
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#1B00BF] via-gray-900 to-black">
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

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="text-white text-xs font-medium block mb-1.5">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
                value={formData.confirmPassword}
                onChange={handleChange}
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
              <a href="/login" className="text-[#1B00BF] hover:text-[#1500a0] font-semibold">
                เข้าสู่ระบบ
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* WEB-APP (Desktop)*/}
      <div className="hidden md:flex items-center justify-center h-screen overflow-hidden">
        {/* Main Container with white background box */}
        <div className="flex w-4/5 max-w-6xl h-4/5 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Left Side - Blue Background with Logo */}
          <div className="w-1/2 bg-[#1B00BF] flex flex-col items-center justify-center p-8">
            <img className="w-64 h-auto" src={Logo} alt="Boxmate Logo" />
          </div>

          {/* Right Side - White Background with Register Form */}
          <div className="w-1/2 bg-white flex flex-col items-center justify-center p-12 overflow-y-auto">
            <h2 className="text-[#1B00BF] text-3xl font-bold mb-2 text-center">
              Sign Up
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              สร้างบัญชีของคุณ
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-lg w-full">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form className="space-y-5 w-full" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="text-gray-700 text-sm font-medium block mb-2">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="กรอกชื่อ-นามสกุล"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700 text-sm font-medium block mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="example@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-700 text-sm font-medium block mb-2">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-gray-700 text-sm font-medium block mb-2">
                  ยืนยันรหัสผ่าน
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2
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
              <p className="text-gray-600 text-sm text-center mt-4">
                มีบัญชีอยู่แล้ว?{" "}
                <a href="/login" className="text-[#1B00BF] hover:text-[#1500a0] font-semibold">
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
