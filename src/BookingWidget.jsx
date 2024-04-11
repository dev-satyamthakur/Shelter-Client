import React from "react";

function BookingWidget({place}) {
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
              <input type="date" name="" id="" />
            </div>
            <div className="p-4 border-l">
              <label htmlFor="">Check Out:</label>
              <input type="date" name="" id="" />
            </div>
          </div>
          <div>
            <div className="p-4 border-t">
              <label htmlFor="">Max Guests:</label>
              <input type="number" name="" id="" value={1} />
            </div>
          </div>
        </div>
        <button className="primary mt-4">Book this place</button>
      </div>
    </div>
  );
}

export default BookingWidget;
