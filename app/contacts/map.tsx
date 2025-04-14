"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const center = {
  lat: 42.67350844814557,
  lng: 23.263350104060233,
};

const Map = () => {
  const apiKey = "AIzaSyAxTEWXFKDG60sIhhddBH8Tifk1DsSzptA";

  // Function to handle click and open Google Maps with navigation
  const handleMapClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${center.lat},${center.lng}`;
    window.open(googleMapsUrl, "_blank"); // Open Google Maps in a new tab
  };

  return (
    <div
      onClick={handleMapClick}
      style={{ cursor: "pointer" }}
      className="w-full max-w-[400px] mx-auto"
    >
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "300px",
            maxWidth: "400px",
          }}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
