import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/Auth/Auth.actions";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (auth.registrationSuccess) {
      navigate("/login");
    }
  }, [auth.registrationSuccess, navigate]);

  const handleRegister = (event) => {
    event.preventDefault();
    const userData = {
      name: userName,
      email: email,
      password: password,
      isSalonRole: false,
      visitedSalons: [],
      location: location,
    };
    dispatch(register(userData));
  };
  return (
    <div className="flex justify-center items-center p-[20px]   h-[100vh]">
      <form
        onSubmit={handleRegister}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="w-full bg-gray-100 max-w-lg md:max-w-md lg:max-w-sm flex flex-col gap-[10px] border-2 p-[10px] rounded-md border-greay-200  "
      >
        <h2 className="text-2xl mb-6 text-center">Register</h2>

        <div className="flex flex-col items-start">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <div className="m-auto mt-[20px]">
          <p>
            Already have a account?
            <Link to="/login">
              <span className="text-blue-700"> Login</span>
            </Link>
          </p>

          <Link to="/register-salon">
            {" "}
            <p>Register as a Salon!</p>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
