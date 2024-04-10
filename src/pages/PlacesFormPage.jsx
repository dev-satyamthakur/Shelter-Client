import React, { useEffect } from "react";
import { useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckInTime] = useState("");
  const [checkOut, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckInTime(data.checkIn);
      setCheckOutTime(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, desc) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(desc)}
      </div>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title of your place should be concise and catchy"
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title, for example: My lovely place"
          />
          {preInput("Address", "Address of the place you want to share")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="Address"
          />
          {preInput(
            "Photos",
            "Add photos of your place, at least one photo is required"
          )}

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          <h2 className="text-2xl mt-4">Description</h2>
          <textarea
            className="w-full h-40 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description about the place you want to share"
          />
          <h2 className="text-2xl mt-4">Perks</h2>
          <p className="text-gray-500 text-sm">
            Select all the perks of your place.
          </p>
          <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          <h2 className="text-2xl mt-4">Extra Info</h2>
          <textarea
            className="w-full h-40"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Add any extra info about your place ..."
          />
          <h2 className="text-2xl mt-4">Check in & out times, max guests</h2>
          <p className="text-gray-500 text-sm">
            Add check in & out times and maximum guests allowed
          </p>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1 ">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckInTime(ev.target.value)}
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 ">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOutTime(ev.target.value)}
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max guests</h3>
              <input
                type="text"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="text"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </div>
  );
}

export default PlacesFormPage;
