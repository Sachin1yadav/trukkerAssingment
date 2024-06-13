import React, { useState, useEffect } from "react";
import "./From.css";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

const FormComponent = ({ handleClose,updateTableData  }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formData, setFormData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = "https://api.countrystatecity.in/v1/countries";
  const key = "RGhzemVIZFQ2VWZWRGdUb2UwMUlBeW9MUEZyejd0dUwzaUhsYWExbQ==";

  useEffect(() => {
    axios
      .get(api, { headers: { "X-CSCAPI-KEY": key } })
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const onSubmit = (data) => {
    const newUser = {
      ...data,
      id: Math.floor(Math.random() * 10000000),
      status: "ACTIVE",
    };
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    storedData.push(newUser);
    localStorage.setItem("formData", JSON.stringify(storedData));
    setFormData(storedData);
    reset();
    updateTableData(storedData);
    handleClose();
  };

  const handleCancel = () => {
    reset();
    handleClose();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mb-3">
          <label htmlFor="country" className="form-label">
            Country {<span className="error">*</span>}
          </label>
          <select
            id="country"
            name="country"
            className="form-select"
            {...register("country", { required: "Country is required" })}
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              <>
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.iso2} value={country.iso2}>
                    {country.name}
                  </option>
                ))}
              </>
            )}
          </select>
          {errors.country && (
            <span className="error">{errors.country.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name {<span className="error">*</span>}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
               placeholder="frist name"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName.message}</span>
          )}
        </div>

        <div className=" mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name {<span className="error">*</span>} 
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
             placeholder="last name"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <span className="error">{errors.lastName.message}</span>
          )}
        </div>
        <label
          htmlFor="mobileCode"
          className="form-label me-2 items-start text-start"
        >
          MOBILE NUMMBER {<span className="error">*</span>}
        </label>
        <div className=" mb-3 d-flex align-items-start">
          <select
            id="mobileCode"
            name="mobileCode"
            className="form-select"
            style={{ width: "80px" }}
            {...register("mobileCode", { required: "Mobile Code is required" })}
          >
            <option value="">Code</option>
            <option value="966">966</option>
            <option value="971">971</option>
            <option value="91">91</option>
          </select>

          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            className="form-control flex-grow-1 ms-2"
            placeholder="Enter Mobile Number"
            {...register("mobileNumber", {
              required: "Mobile Number is required",
            })}
          />
          {errors.mobileNumber && (
            <span className="error">{errors.mobileNumber.message}</span>
          )}
        </div>

        <div className="mb-3 ">
          <label htmlFor="selectRole" className="form-label">
            Role {<span className="error">*</span>}
          </label>
          <select
            id="selectRole"
            name="selectRole"
            className="form-select"
            {...register("selectRole", { required: "Role is required" })}
          >
            <option value="">Select Role</option>
            <option value="role1">Role1</option>
            <option value="role2">Role2</option>
            <option value="role3">Role3</option>
          </select>
          {errors.selectRole && (
            <span className="error">{errors.selectRole.message}</span>
          )}
        </div>

        <div className="mb-3 ">
          <label htmlFor="supervisor" className="form-label">
            Supervisor {<span className="error">*</span>}
          </label>
          <select
            id="supervisor"
            name="supervisor"
            className="form-select"
            {...register("supervisor", { required: "Supervisor is required" })}
          >
            <option value="">Select Supervisor</option>
            <option value="sup1">Sup1</option>
            <option value="sup2">Sup2</option>
            <option value="sup3">Sup3</option>
          </select>
          {errors.supervisor && (
            <span className="error">{errors.supervisor.message}</span>
          )}
        </div>

        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email {<span className="error">*</span>}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className="form-control"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div
      
          className="mb-3 d-flex flex-column align-start justify-start items-start ml-0"
        >
          <label   htmlFor="cordlimit">
            Card Load Limit {<span className="error">*</span>}
          </label>
          <input
            type="number"
            id="cordlimit"
            name="cordlimit"
            className="form-control"
            placeholder="2 3 4 4"
            {...register("cordlimit", {
              required: "Card Load Limit is required",
            })}
          />
          {errors.cordlimit && (
            <span className="error">{errors.cordlimit.message}</span>
          )}
        </div>

        <div className="mb-3 ">
          <label htmlFor="paymentlimit" className="form-label">
            Payment Limit {<span className="error">*</span>}
          </label>
          <input
            type="number"
            id="paymentlimit"
            name="paymentlimit"
            className="form-control"
             placeholder="1000000"
            {...register("paymentlimit", {
              required: "Payment Limit is required",
            })}
          />
          {errors.paymentlimit && (
            <span className="error">{errors.paymentlimit.message}</span>
          )}
        </div>

        <div className="buttons">
          <button type="submit">
            <FaPlus
              style={{
                marginRight: "5px",
                verticalAlign: "middle",
                marginBottom: "5px",
              }}
            />
            Add User
          </button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
