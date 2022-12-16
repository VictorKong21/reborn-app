// Packages used:
// 1) React
// 2) Material UI (Core)

// To implement:
// 1) Map UI - react leaflet to add
// 2)

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
      <Button variant="contained">Share as jpg button</Button>
      <Button variant="contained">Share to social media button</Button>
    </div>
  );
}

export default App;
