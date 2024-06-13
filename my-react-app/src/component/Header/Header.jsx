import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Header.css";
const Header = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

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
  return (
    <div>
      <div className="headersection">
        <div>
          <p className="heading">Rudra Transporter - Transporter</p>
        </div>

        <div className="d-flex gap-3  ">
          <div>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div>
            <select
              id="country"
              name="country"
              className="form-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
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
          </div>
        </div>
      </div>
      <p className="setting">Settings</p>
    </div>
  );
};

export default Header;
