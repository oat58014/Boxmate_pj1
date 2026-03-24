import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./component/Home";
import Statistics from "./component/dashboard/analytic";
import Analytics from "./component/dashboard/stat";
import Register from "./component/Register";
import Order from "./component/packages/order";
import Stock from "./component/packages/stock";
import UserProfile from "./component/UserProfile";
import Login from "./component/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/stats" element={<Statistics />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/packages/stock" element={<Stock />} />
        <Route path="/packages/order" element={<Order />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserProfile />} />
        <Route path="/settings" element={<div>หน้าตั้งค่า</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
