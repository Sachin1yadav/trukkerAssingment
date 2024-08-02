import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Component/Loading";

const MyBooking = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userid");
  const [isLoading, setIsLoading] = useState(false);
  const getBooked = async () => {
    setIsLoading(true);
    try {
      let res = axios.get(`https://nayi-1.onrender.com/users/${userId}`);
      let resdata = await res;
      setData(resdata.data?.visitedSalons);
      console.log("resdata.data?.visitedSalons", resdata.data?.visitedSalons);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBooked();
  }, []);
  if(isLoading){
    return <Loading/>
  }
  return (
    <div className="pt-[100px] min-h-[100vh]">
      My Bookings
      {data.length == 0 ? (
        <div className="flex gap-[10px] flex-col justify-center items-center">
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?t=st=1721413443~exp=1721417043~hmac=df20590d4dc47dfe000da74e011555140c432b9fac8525961029f48e321601a2"
            alt=""
          />
          <p>ohh! You have not booked yet</p>
          <button className="bg-red-700 text-white p-[10px] rounded-lg  w-[300px]   transition-transform duration-300 ease-in-out hover:scale-105">
            <Link to="/Salons">Book Slote</Link>
          </button>
        </div>
      ) : (
        <div className="flex flex-col  h-screen w-full items-center gap-[20px]  mt-[40px] px-4">
          <div className="w-full max-w-md">
            <div className="flex gap-[10px] flex-col">
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  className=" transition-transform duration-300 ease-in-out hover:scale-105 border-2 border-gray-100 bg-gray-100 cursor-pointer flex flex-col justify-start items-start p-[10px]"
                >
                  <p>{item.serviceName}</p>
                  <div className="flex gap-[20px] ">
                    <p>{item.time}</p>
                    <p>{item.endTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p>Book new Slot</p>
          <button className="bg-red-700 text-white p-[10px] rounded-lg  w-[300px]   transition-transform duration-300 ease-in-out hover:scale-105">
            <Link to="/Salons">Book Slote</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
