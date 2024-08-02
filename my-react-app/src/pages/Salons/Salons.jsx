import axios from "axios";
import React, { useEffect, useState } from "react";
import "./salons.css";
import { useNavigate } from "react-router-dom";
import { haversineDistance } from "../../utils/utilsfunctions";
import Loading from "../../Component/Loading";

const Salons = () => {
  const [data, setData] = useState([]);
  let userlocation = JSON.parse(localStorage.getItem("lat&lon"));
  const nav = useNavigate();
const [isLoading,setIsLoading]=useState(false)
  const fetchsalon = async () => {
    setIsLoading(true)
    try {
      let res = await axios.get("https://nayi-1.onrender.com/salons");
      setData(res.data);
      setIsLoading(false)
    } catch (err) {
      console.error("Failed to fetch salons:", err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchsalon();
  }, []);

  const handelSalonDetailes = (id) => {
    nav(`/salons/${id}`);
  };
  if(isLoading){
    return <Loading/>
  }
  return (
    <>
       
      <div className="w-[90%] justify-center pb-[100px] h-full  md:justify-start lg:justify-start  m-auto   flex gap-4 flex-wrap pt-[100px] ">
        {data?.map((item, index) => {
          // Calculate distance
          let distance = null;
          if (userlocation && item.location) {
            distance = haversineDistance(
              item.location.latitude,
              item.location.longitude,
              userlocation.latitude,
              userlocation.longitude
            );
          }

          return (
            <div
              key={index}
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="lg:w-[250px] md:w-[250px]  text-left w-[300px] rounded-lg flex flex-col gap-3 p-[10px]  items-cemter"
            >
              <img
                className="salonimg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                src="https://s3-media0.fl.yelpcdn.com/bphoto/dliR8KF1ysvmYP5icrqXYw/1000s.jpg"
                alt=""
              />
              <div>
                <p>{item.name}</p>
                <p>
                  {item.location.locality}, {item.location.market},{" "}
                  {item.location.city}
                </p>
                <div>
                  <p>Distance: {distance} km</p>
                </div>
              </div>
              <button
                className="bg-gray-300 rounded-lg p-[10px] transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={() => handelSalonDetailes(item.id)}
              >
                Book slot
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Salons;
