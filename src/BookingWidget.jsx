import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [redirect, setRedirect] = useState("");

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name: fullName,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="p-4">
              <label htmlFor="">Check In:</label>
              <input
                type="date"
                name=""
                id=""
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="p-4 border-l">
              <label htmlFor="">Check Out:</label>
              <input
                type="date"
                name=""
                id=""
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="p-4 border-t">
              <label htmlFor="">Max Guests:</label>
              <input
                type="number"
                name=""
                id=""
                value={numberOfGuests}
                onChange={(ev) => setNumberOfGuests(ev.target.value)}
              />
            </div>
          </div>
          {numberOfNights > 0 && (
            <div className="p-4 border-t">
              <label htmlFor="">Your full name</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="John Doe"
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
              />
              <label htmlFor="">Your phone number</label>
              <input
                type="tel"
                name=""
                id=""
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
}

export default BookingWidget;
