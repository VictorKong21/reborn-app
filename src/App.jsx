import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useMap, MapContainer, TileLayer, Marker } from "react-leaflet";
import data from "./data/location_list.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";

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
      <h1>Title here</h1>
      {/* Map Component */}
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
      {/* Table */}
      <>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "70%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Reroll</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countryRecord.map((country, index) => (
                <TableRow
                  key={uuidv4()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}

export default App;
