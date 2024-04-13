import React from "react";

function PlaceImg({ place, ind = 0, className=null }) {
  if (!place.photos.length) {
    return "";
  }

  if (className) {
    className = 'object-cover'
  }

  return (
    <img
      src={"http://localhost:4000/uploads/" + place.photos[ind]}
      className="object-cover w-full h-full"
    />
  );
}

export default PlaceImg;
