import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={"/account/bookings/" + booking._id}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              key={booking.place}
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-sm">
                  {format(new Date(booking.checkIn), "dd-MM-yyyy")} -{" "}
                  {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                </div>
                <div className="text-sm">Guests: {booking.numberOfGuests}</div>
                <div className="text-sm">Price: ${booking.price}</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BookingsPage;
