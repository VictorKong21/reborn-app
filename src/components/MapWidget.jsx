import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useMap, MapContainer, TileLayer, Marker } from "react-leaflet";
import data from "../data/location_list.json";

function MapWidget() {
  // Handle random location
  // const pinLocation = [5, 5];
  const [pinLocation, setPinLocation] = useState([5, 5]);
  const randomCountryIndex = Math.floor(Math.random() * data.length);
  const randomCountryName = data[randomCountryIndex].Country;
  const randomCountryLatitude = data[randomCountryIndex].Latitude;
  const randomCountryLongitude = data[randomCountryIndex].Longitude;

  function handlePinLocation() {
    setPinLocation([randomCountryLatitude, randomCountryLongitude]);
    console.log("Country: " + randomCountryName);
  }

  // Handle auto panning based on pin location
  function UpdateMapCentre(props) {
    const map = useMap();
    map.panTo(props.mapCentre, {
      animate: true,
      duration: 1,
      easeLinearity: 0.5,
    });
    return null;
  }

  return (
    <>
      <MapContainer center={[0, 0]} zoom={1.5} attributionControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pinLocation}></Marker>
        <UpdateMapCentre mapCentre={pinLocation} />
      </MapContainer>
      <Button onClick={handlePinLocation} variant="contained">
        Refresh Data
      </Button>
    </>
  );
}

export default MapWidget;
