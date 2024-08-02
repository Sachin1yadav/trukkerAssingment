import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { ToastContainer } from "react-toastify";
import Loading from "../../../Component/Loading";
const bookingSlots = [
  {
    id: 1,
    time: "09:00 AM",
    endTime: "09:30 AM",
    serviceId: 32,
    serviceName: "haircut",
    available: true,
  },
  {
    id: 2,
    time: "09:30 AM",
    endTime: "09:50 AM",
    serviceId: 31,
    serviceName: "shaving",
    available: false,
  },
  {
    id: 3,
    time: "09:50 AM",
    endTime: "10:20 AM",
    serviceId: 32,
    serviceName: "haircut",
    available: false,
  },
  {
    id: 4,
    time: "10:20 AM",
    endTime: "10:40 AM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 5,
    time: "10:40 AM",
    endTime: "11:10 AM",
    serviceId: 32,
    serviceName: "haircut",
    available: true,
  },
  {
    id: 6,
    time: "11:10 AM",
    endTime: "11:30 AM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 7,
    time: "11:30 AM",
    endTime: "12:00 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: false,
  },
  {
    id: 8,
    time: "12:00 PM",
    endTime: "12:20 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 9,
    time: "12:20 PM",
    endTime: "12:50 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: false,
  },
  {
    id: 10,
    time: "12:50 PM",
    endTime: "01:10 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 11,
    time: "01:10 PM",
    endTime: "01:40 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: false,
  },
  {
    id: 12,
    time: "01:40 PM",
    endTime: "02:00 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 13,
    time: "02:00 PM",
    endTime: "02:30 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: false,
  },
  {
    id: 14,
    time: "02:30 PM",
    endTime: "02:50 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 15,
    time: "02:50 PM",
    endTime: "03:20 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: true,
  },
  {
    id: 16,
    time: "03:20 PM",
    endTime: "03:40 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 17,
    time: "03:40 PM",
    endTime: "04:10 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: true,
  },
  {
    id: 18,
    time: "04:10 PM",
    endTime: "04:30 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 19,
    time: "04:30 PM",
    endTime: "05:00 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: true,
  },
  {
    id: 20,
    time: "05:00 PM",
    endTime: "05:20 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 21,
    time: "05:20 PM",
    endTime: "05:50 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: true,
  },
  {
    id: 22,
    time: "05:50 PM",
    endTime: "06:10 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
  {
    id: 23,
    time: "06:10 PM",
    endTime: "06:40 PM",
    serviceId: 32,
    serviceName: "haircut",
    available: true,
  },
  {
    id: 24,
    time: "06:40 PM",
    endTime: "07:00 PM",
    serviceId: 31,
    serviceName: "shaving",
    available: true,
  },
];

const RegisterSalon = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locality, setLocality] = useState("");
  const [market, setMarket] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
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
  const submitsalondata = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://nayi-1.onrender.com/salons",
        userData
      );
      let res = await response;
      console.log("response", res);
      if (res) {
        const encryptedEmail = CryptoJS.AES.encrypt(
          userData.email,
          "secret-key"
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          userData.password,
          "secret-key"
        ).toString();

        localStorage.setItem("email", encryptedEmail);
        localStorage.setItem("password", encryptedPassword);
        localStorage.setItem("userid", res.data.id);
        dispatch({ type: REGISTER_SALON_SUCCESS, payload: res.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleRegister = (event) => {
    event.preventDefault();
    const userData = {
      name: userName,
      email: email,
      password: password,
      shopkeeperId: Math.floor(Math.random() * (999999 - 1 + 1)) + 1,
      services: [
        {
          name: "haircut",
          id: 32,
          avgTime: "30min",
        },
        {
          name: "saving",
          id: 31,
          avgTime: "20min",
        },
      ],
      bookingSlots: bookingSlots,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        locality: locality,
        market: market,
        city: city,
      },
    };
    console.log("userData", userData);
    // dispatch(register(userData));
    submitsalondata(userData);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center items-center p-[20px]   h-[100vh]">
      <form
        onSubmit={handleRegister}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="w-full bg-gray-100 max-w-lg md:max-w-md lg:max-w-sm flex flex-col gap-[10px] border-2 p-[10px] rounded-sm border-greay-200  "
      >
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        {/* <button onClick={() => navigate(-1)} >back</button> */}
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
        <div className="flex flex-col items-start">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Addres
          </label>
          <div className="flex gap-[10px]">
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              required
              placeholder="locality"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* <label
          htmlFor="name"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label> */}
            <input
              type="text"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              required
              placeholder="market"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="City"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register Salon
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterSalon;
