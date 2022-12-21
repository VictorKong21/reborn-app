import React, { useState } from "react";
import { useMap, MapContainer, TileLayer, Marker } from "react-leaflet";
import data from "./data/location_list.json";
import { Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  // Array to store country records
  const [countryRecord, setCountryRecord] = useState([]);
  // Set Map Widget:
  const [pinLocation, setPinLocation] = useState([5, 5]);
  const randomCountryIndex = Math.floor(Math.random() * data.length);
  const randomCountryName = data[randomCountryIndex].Country;
  const randomCountryLatitude = data[randomCountryIndex].Latitude;
  const randomCountryLongitude = data[randomCountryIndex].Longitude;
  // Set Map Pin Location
  function handlePinLocation() {
    setPinLocation([randomCountryLatitude, randomCountryLongitude]);
    setCountryRecord(prevCountryRecord => [
      ...prevCountryRecord,
      randomCountryName,
    ]);
    // ******* BUG: First result doesn't show up after first click!!
    setCountryRecordObj(
      countryRecord.map((country, index) => ({
        id: index + 1,
        country,
      }))
    );
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

  // Table 2
  const columns = [
    { field: "id", headerName: "Reroll", width: 50 },
    { field: "country", headerName: "Country", width: 130 },
  ];

  // Table2 testing
  const [countryRecordObj, setCountryRecordObj] = useState([]);

  return (
    <Stack alignItems="center" spacing={2}>
      {/* Title */}
      <Typography variant="h4">Title</Typography>
      {/* Map Component */}
      <MapContainer center={[0, 0]} zoom={1.5} attributionControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pinLocation}></Marker>
        <UpdateMapCentre mapCentre={pinLocation} />
      </MapContainer>

      {/* Refresh Button */}
      <Button onClick={handlePinLocation} variant="contained">
        Refresh Data
      </Button>

      {/* Table2 */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          rows={countryRecordObj}
          columns={columns}
          // pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Stack>
  );
}

export default App;
