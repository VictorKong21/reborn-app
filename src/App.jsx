import React, { useState } from "react";
import { useMap, MapContainer, TileLayer, Marker } from "react-leaflet";
import data from "./data/location_list.json";
import data2 from "./data/births_by_location.json";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  // Clean data - JSON data merge:
  const mergedData = [];
  for (const birth of data2) {
    const location = data.find(
      loc => loc.Country.trim() === birth.Country.trim()
    );
    if (location) {
      const data3 = {
        Country: birth.Country.trim(),
        Latitude: location.Latitude,
        Longitude: location.Longitude,
        Code: location.Code,
        Births: Number(birth.Births.replace(/,/g, "")),
      };
      mergedData.push(data3);
    }
  }
  mergedData.sort((a, b) => {
    if (a.Country < b.Country) {
      return -1;
    } else if (a.Country > b.Country) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(mergedData);

  function getRandomCountryIndex() {
    const totalBirths = mergedData.reduce(
      (acc, birth) =>
        acc + Number(JSON.stringify(birth.Births).replace(/,/g, "")),
      0
    );
    const rand = Math.random() * totalBirths;

    let runningTotal = 0;
    let index = 0;
    for (const birth of mergedData) {
      runningTotal += Number(JSON.stringify(birth.Births).replace(/,/g, ""));
      if (runningTotal > rand) {
        return index;
      }
      index++;
    }

    return -1;
  }

  // Array to store country records
  const [countryRecord, setCountryRecord] = useState([]);

  // Set Map Widget:
  const [pinLocation, setPinLocation] = useState([5, 5]);
  const randomCountryIndex = getRandomCountryIndex();
  const randomCountryName = mergedData[randomCountryIndex].Country;
  const randomCountryLatitude = mergedData[randomCountryIndex].Latitude;
  const randomCountryLongitude = mergedData[randomCountryIndex].Longitude;

  // Set Map Pin Location
  function handlePinLocation() {
    setPinLocation([randomCountryLatitude, randomCountryLongitude]);
    setCountryRecord(prevCountryRecord => [
      ...prevCountryRecord,
      {
        id: prevCountryRecord.length + 1,
        country: randomCountryName,
      },
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

  // Table 2
  const columns = [
    { field: "id", headerName: "Reroll", flex: 0.5 },
    { field: "country", headerName: "Country", flex: 1 },
  ];

  return (
    <Stack alignItems="center" spacing={2}>
      {/* Title */}
      <Typography variant="h4">Title</Typography>
      {/* Map Component */}
      <MapContainer
        center={[0, 0]}
        zoom={1.5}
        attributionControl={false}
        zoomControl={false}
        doubleClickZoom={false}
        closePopupOnClick={false}
        dragging={false}
        zoomSnap={false}
        zoomDelta={false}
        trackResize={false}
        touchZoom={false}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pinLocation}></Marker>
        <UpdateMapCentre mapCentre={pinLocation} />
      </MapContainer>

      {/* Refresh Button */}
      <Button onClick={handlePinLocation} variant="contained">
        Refresh Data
      </Button>

      {/* Dropdown Menu */}

      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={mergedData}
        autoHighlight
        getOptionLabel={option => option.Country}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.Country}
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />

      {/* Table Reroll Stats */}
      <Box sx={{ height: 400, width: "50%" }}>
        <DataGrid
          rows={countryRecord}
          columns={columns}
          disableColumnMenu
          pageSize={20}
          headerStyle={{ backgroundColor: "red", color: "white" }}
          rowsPerPageOptions={[20]}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
        />
      </Box>
    </Stack>
  );
}

export default App;
