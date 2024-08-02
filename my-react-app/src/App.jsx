import React from "react";
import MobileNav from "./Component/MobileNav.jsx";
import NavbarComponent from "./Component/Navbar.jsx";
import AllRoutes from "./Routes/AllRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
 
const App = () => {
  return (
    <div className="App">
      <AllRoutes />
      <NavbarComponent />
      <MobileNav />
      <ToastContainer />
    </div>
  );
};

export default App;
