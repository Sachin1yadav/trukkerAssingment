// src/actions/authActions.js
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_SALON_SUCCESS = "REGISTER_SALON_SUCCESS";
export const login = (email, password) => {
    return async (dispatch) => {
      try {
        // Using GET request to verify credentials
        const response = await axios.get("https://nayi-1.onrender.com/users", {
          params: {
            email,
            password,
          },
        });
  
        // Check if the response data contains a user
        const user = response.data.find(
          (user) => user.email === email && user.password === password
        );
  
        if (user) {
          const encryptedEmail = CryptoJS.AES.encrypt(
            email,
            "secret-key"
          ).toString();
          const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            "secret-key"
          ).toString();
  
          localStorage.setItem("email", encryptedEmail);
          localStorage.setItem("password", encryptedPassword);
          localStorage.setItem("userid", user?.id);
          localStorage.setItem("username", user?.name);
          toast.success("Login Successful");
          dispatch({ type: LOGIN_SUCCESS, payload: { email } });
        } else {
          dispatch({ type: LOGIN_FAILURE, payload: "Invalid credentials" });
          toast.error("Login Failed");
        }
      } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        toast.error("Login Failed");
      }
    };
  };
  
  export const register = (userData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          "https://nayi-1.onrender.com/users",
          userData
        );
  
        if (response.data) {
          dispatch({ type: REGISTER_SUCCESS, payload: response.data });
          toast.success("User Registered Successfully");
        } else {
          dispatch({ type: REGISTER_FAILURE, payload: "Registration failed" });
          toast.error("Registration Failed");
        }
      } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
        toast.error("Registration Failed");
      }
    };
  };
  
  export const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("userId");
  
    return { type: LOGIN_FAILURE };
  };