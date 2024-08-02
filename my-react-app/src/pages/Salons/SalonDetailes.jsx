import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { haversineDistance } from "../../utils/utilsfunctions";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../Component/Loading";

const SalonDetailes = () => {
  const { id } = useParams();
  const [salondetailes, setSalonDetailes] = useState();
  const [distance, setDistance] = useState();
  const [isBooking, setIsBooking] = useState(false);
  const [selectedSlote, setSelectedSlote] = useState([]);
  let userlocation = JSON.parse(localStorage.getItem("lat&lon"));
  const userId = JSON.parse(localStorage.getItem("userid"));
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handelOpenModal = () => {
    setIsOpen(!isOpen);
  };
  const fetchsalondetailes = async (id) => {
    setIsLoading(true);
    try {
      let res = await axios.get(`https://nayi-1.onrender.com/salons/${id}`);
      let resdata = res.data;
      setSalonDetailes(resdata);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const updateSlotAvailability = async (slotId) => {
    setIsLoading(true);
    try {
      const updatedSlots = salondetailes.bookingSlots.map((slot) => {
        if (slot.id === slotId) {
          slot.available = false;
        }
        return slot;
      });
      await axios.put(`https://nayi-1.onrender.com/salons/${id}`, {
        ...salondetailes,
        bookingSlots: updatedSlots,
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const addUserVisitedSalon = async (slot) => {
    setIsLoading(true);
    try {
      let userRes = await axios.get(
        `https://nayi-1.onrender.com/users/${userId}`
      );
      let userData = userRes.data;
      userData.visitedSalons.push(slot);
      await axios.put(`https://nayi-1.onrender.com/users/${userId}`, userData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const createBooking = async (slot) => {
    setIsLoading(true);
    try {
      const bookingData = {
        customerId: userId,
        shopkeeperId: salondetailes.shopkeeperId,
        salonId: id,
        serviceId: slot.serviceId,
        slotId: slot.id,
        date: new Date().toISOString().split("T")[0],
        time: slot.time,
        bookingCharge: slot.charge,
      };
      await axios.post(`https://nayi-1.onrender.com/bookings`, bookingData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchsalondetailes(id);
  }, [id]);

  useEffect(() => {
    if (salondetailes) {
      const distanceInKm = haversineDistance(
        salondetailes?.location?.latitude,
        salondetailes?.location?.longitude,
        userlocation?.latitude,
        userlocation?.longitude
      );
      setDistance(distanceInKm);
    }
  }, [salondetailes, userlocation]);

  const handelSelectSlote = (item) => {
    const index = selectedSlote.findIndex((slote) => slote.id === item.id);
    if (index === -1) {
      setSelectedSlote([...selectedSlote, item]);
    } else {
      const newSlote = selectedSlote.filter((slote) => slote.id !== item.id);
      setSelectedSlote(newSlote);
    }
  };

  const ConfirmeBooking = async () => {
    try {
      for (const slot of selectedSlote) {
        await updateSlotAvailability(slot.id);
        await addUserVisitedSalon(slot);
        await createBooking(slot);
      }
      setIsBooking(false);
      setSelectedSlote([]);
      fetchsalondetailes(id); // Refresh salon details
      toast.success("Slote Booked");
    } catch (err) {
      console.log(err);
      toast.console.error();
      ("Ohh Plase try again");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col pt-[100px] pb-[100px] bg-gray-100 min-h-[100vh]">
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="flex-col  py-[10px] md:flex-row lg:flex-row flex w-full max-w-lg md:max-w-[80%] lg:max-w-[80%] m-auto gap-[20px]"
        >
          <img
            className="w-[300px] h-[300px] rounded-md lg:m-0 md:m-0 m-auto"
            src="https://s3-media0.fl.yelpcdn.com/bphoto/dliR8KF1ysvmYP5icrqXYw/1000s.jpg"
            alt=""
          />
          <div className="w-[90%]   text-left m-auto lg:w-[50%] md:w-[70%] py-[30px] px-[30px] flex flex-col gap-[20px]">
            <div className="flex justify-between lg:flex-row md:flex-col flex-col">
              <div>
                <p>{salondetailes?.name}</p>
                Distance: {distance} km
              </div>
              <p className="text-blue-400">
                {salondetailes?.location?.locality}{" "}
                {salondetailes?.location?.market}{" "}
                {salondetailes?.location?.city}
              </p>
            </div>
            <div className="flex gap-[20px]">
              {salondetailes?.services?.map((service, index) => (
                <div
                  key={index}
                  className="flex transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer gap-[10px] border-2 border-gray-300 p-[10px] rounded-lg"
                >
                  <p>{service.name}</p>
                  <p>{service.avgTime}</p>
                </div>
              ))}
            </div>
            <button
              className="bg-red-300 sticky top-2 rounded-lg p-[10px] transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => setIsBooking(!isBooking)}
            >
              {isBooking ? "Cancel" : "Book"}
            </button>
          </div>
        </div>
        <div
          className={`w-[90%] max-w-lg md:max-w-[80%] lg:max-w-[80%]  m-auto mt-[50px] transition-all duration-500 ease-in-out ${
            isBooking
              ? "max-h-screen opacity-100 overflow-visible"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="m-auto flex justify-end z-10">
            {selectedSlote.length !== 0 && (
              <button
                className="bg-red-700 text-white p-[10px] rounded-lg mb-[10px] fixed z-10 transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={ConfirmeBooking}
              >
                Confirm Booking
              </button>
            )}
          </div>
          <div className="z-0 scroll-m-0 overflow-y-scroll flex gap-[10px] flex-wrap md:justify-start lg:justify-start justify-center transition-transform duration-500 ease-in-out max-h-[400px]">
            {salondetailes?.bookingSlots?.map((item, ind) => (
              <div
                key={ind}
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                className={`border-2 p-[10px] rounded-lg flex flex-col transition-transform duration-300 ease-in-out ${
                  item.available
                    ? selectedSlote.findIndex(
                        (slote) => slote.id === item.id
                      ) !== -1
                      ? "bg-blue-300 cursor-pointer"
                      : "border-gray-300"
                    : "border-gray-300 cursor-not-allowed bg-gray-200 opacity-50"
                }`}
                onClick={() => item.available && handelSelectSlote(item)}
              >
                <p>{item?.serviceName}</p>
                <p>{item?.available ? "Available" : "Unavailable"}</p>
                <p>
                  {item?.time} to {item?.endTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SalonDetailes;
