import React from "react";
import { Route, Routes } from "react-router-dom";
import {   Home, NotFound } from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
 
      <Route path="*" element={<NotFound />} /> 
 
    </Routes>
  );
};

export default AllRoutes;
