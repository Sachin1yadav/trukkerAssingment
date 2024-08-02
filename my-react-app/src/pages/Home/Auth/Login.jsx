import React, { useState, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/Auth/Auth.actions";
import { ToastContainer } from "react-toastify";

const Login = () => {
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
          let latandlon = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          localStorage.setItem("lat&lon", JSON.stringify(latandlon));
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
    if (auth.isAuthenticated) {
      navigate("/salons");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex justify-center items-center p-[20px] h-[100vh]">
      <form
        onSubmit={handleLogin}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="w-full bg-gray-100 max-w-lg md:max-w-md lg:max-w-sm flex flex-col gap-[10px] border-2 p-[10px] rounded-lg border-gray-200"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="  password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>
        <div className="m-auto mt-[20px]">
          <p>
            Create Account!
            <Link to="/Register">
              <span className="text-blue-700"> Register</span>
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
