// TODO:
// 1) Map data in country location and birth by country JSON files
// 2) Capture data in table

// Packages used:
// 1) React
// 2) Material UI (Core)
// 3) Map UI - react leaflet to add

// Note:
// 1) Birth data - https://en.wikipedia.org/wiki/List_of_countries_by_number_of_births
// 2) Country location - https://www.mapsofworld.com/world-maps/world-map-with-latitude-and-longitude.html

import React from "react";
import TablePlaceHolder from "./components/Table";
import MapWidget from "./components/MapWidget";
// import Button from "@mui/material/Button";
// import LocationFilter from "./components/LocationFilter";

function App() {
  return (
    <div>
      <h1>Title here</h1>
      {/* <Button variant="contained">Share as jpg (WIP) </Button> */}
      {/* <Button variant="contained">Share to social media (WIP)</Button> */}
      {/* <br /> */}
      {/* <LocationFilter /> */}
      {/* <Button variant="contained">Filter location (WIP)</Button> */}
      <MapWidget />
      <TablePlaceHolder />
    </div>
  );
}

export default App;
