// TODO:
// 1) Map
// 1.1) Remove Leaflet link in bottom right
// 1.2) Remove zoom in and out buttons
// 1.3) Change country language OR remove country names all together?

// Packages used:
// 1) React
// 2) Material UI (Core)
// 3) Map UI - react leaflet to add

// Note:
// 1) Birth data - https://en.wikipedia.org/wiki/List_of_countries_by_number_of_births

import React from "react";
import Button from "@mui/material/Button";
import TablePlaceHolder from "./components/Table";
import Map from "./components/Map";

function App() {
  return (
    <div>
      <h1>Title here</h1>
      <Map attributionControl={false} />
      <Button variant="contained">Refresh Data</Button>
      <TablePlaceHolder />
      <Button variant="contained">Share as jpg </Button>
      <Button variant="contained">Share to social media</Button>
    </div>
  );
}

export default App;
