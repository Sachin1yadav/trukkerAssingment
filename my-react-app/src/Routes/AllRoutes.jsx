import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Home/Auth/Login";
import Register from "../pages/Home/Auth/Register";
import Salons from "../pages/Salons/Salons";
import HomePage from "../pages/Home";
import PrivateRoute from "./PrivateRoutes";
import SalonDetailes from "../pages/Salons/SalonDetailes";
import RegisterSalon from "../pages/Home/Auth/RegisterSalon";
import SearchSalon from "../pages/SearchSalon/SearchSalon";
import MyBooking from "../pages/MyBooking/MyBooking";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/salons/:id" element={<SalonDetailes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-salon" element={<RegisterSalon />} />
      <Route path="/salons" element={<PrivateRoute element={<Salons />} />} />
      <Route path="/search-salons" element={<PrivateRoute element={<SearchSalon/>} />} />
             <Route path="/my-bookingg" element={<PrivateRoute element={<MyBooking/>} />} />

       
      {/* <Route path="/salons" element={<Salons />} /> */}

      {/* <Route path="*" /> */}
    </Routes>
  );
};

export default AllRoutes;
