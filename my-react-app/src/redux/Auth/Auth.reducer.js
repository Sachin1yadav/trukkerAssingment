// src/reducers/authReducer.js
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SALON_SUCCESS,
} from "./Auth.actions.js";
import CryptoJS from "crypto-js";

const userid = localStorage.getItem("userid") || "";
const encryptedEmail = localStorage.getItem("email") || "";
const encryptedPassword = localStorage.getItem("password") || "";
 const decryptedEmail = CryptoJS.AES.decrypt(
  encryptedEmail,
  "secret-key"
).toString(CryptoJS.enc.Utf8);
const decryptedPassword = CryptoJS.AES.decrypt(
  encryptedPassword,
  "secret-key"
).toString(CryptoJS.enc.Utf8);
const initialState = {
  isAuthenticated: userid ? true : false,
  email: decryptedEmail,
  error: decryptedPassword,
  registrationSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        email: null,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        registrationSuccess: true,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registrationSuccess: false,
        error: action.payload,
      };
    case REGISTER_SALON_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        registrationSuccess: true,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
