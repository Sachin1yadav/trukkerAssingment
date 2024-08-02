import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const nav = useNavigate();
  let IsAuth = localStorage.getItem("token") || false;

  const handelAuth = () => {
    if (IsAuth) {
      nav("/Salons");
    } else {
      nav("/login");
    }
  };
  return (
    <div className="Homecontainer ">
      <p> Book Your Slot!</p>
      <p>Get Best Salon service as per your time!</p>
      <button
        onClick={handelAuth}
        className="bg-red-300 font-bold space-x-2 rounded-full p-[10px] transition-transform duration-300 ease-in-out hover:scale-105"

      >
        Check Slots
      </button>
    </div>
  );
};

export default HomePage;
