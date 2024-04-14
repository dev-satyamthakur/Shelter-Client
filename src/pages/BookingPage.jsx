import React from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import axios from "axios";
import { useEffect, useState } from "react";
import PlaceGallery from "../PlaceGallery";
import { format } from "date-fns";

function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
        <h2 className="text-xl">Your booking information</h2>
        <div className="py-3">
          <h2 className="text-xl">{booking.place.title}</h2>
          <div className="text-sm">
            {format(new Date(booking.checkIn), "dd-MM-yyyy")} -{" "}
            {format(new Date(booking.checkOut), "dd-MM-yyyy")}
          </div>
          <div className="text-sm">Guests: {booking.numberOfGuests}</div>
          <div className="text-2xl">Price: ${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default BookingPage;
