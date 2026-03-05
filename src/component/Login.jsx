import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../image/boxmateLogo1.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // ตรวจสอบว่าเติมข้อมูลครบ
    if (!formData.email || !formData.password) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      // TODO: ส่งข้อมูลไปยัง API ที่นี่
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      
      console.log("ข้อมูลการเข้าสู่ระบบ:", loginData);

      // จำลองการปิด loading และ navigate
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(loginData)
      // });

      // สำเร็จแล้ว ไปหน้า home
      navigate("/home");
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
            Sign In
          </h2>
          <p className="text-white/70 text-xs mb-5 text-center">
            เข้าสู่ระบบของคุณ
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                placeholder="กรอกรหัสผ่าน"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1B00BF] hover:bg-[#1500a0] text-white font-semibold
                       py-2.5 px-4 rounded-lg transition duration-200 transform
                       hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm"
            >
              เข้าสู่ระบบ
            </button>

            {/* Register Link */}
            <p className="text-white/70 text-sm text-center mt-4">
              ยังไม่มีบัญชี?{" "}
              <a href="/register" className="text-[#1B00BF] hover:text-[#1500a0] font-semibold">
                สร้างบัญชี
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* WEB-APP (Desktop)*/}
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center relative h-screen overflow-hidden bg-gradient-to-r from-[#1B00BF] via-gray-900 to-black">
        {/* Logo */}
        <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
          <img className="w-64 h-auto" src={Logo} alt="Boxmate Logo" />
        </div>

        {/* LOGIN FORM (Desktop)*/}
        <div className="absolute inset-0 z-10 flex items-center justify-end pr-32">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
            <h2 className="text-white text-3xl font-bold mb-2 text-center">
              Sign In
            </h2>
            <p className="text-white/70 text-sm mb-6 text-center">
              เข้าสู่ระบบของคุณ
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="text-white text-sm font-medium block mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30
                           text-white placeholder-white/50 focus:outline-none focus:ring-2
                           focus:ring-[#1B00BF] focus:border-transparent transition"
                  placeholder="กรอกรหัสผ่าน"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1B00BF] hover:bg-[#1500a0] text-white font-semibold
                         py-3 px-4 rounded-lg transition duration-200 transform
                         hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                เข้าสู่ระบบ
              </button>

              {/* Register Link */}
              <p className="text-white/70 text-sm text-center mt-4">
                ยังไม่มีบัญชี?{" "}
                <a href="/register" className="text-[#1B00BF] hover:text-[#1500a0] font-semibold">
                  สร้างบัญชี
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}