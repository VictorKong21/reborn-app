import React, { useState } from "react";
import { useMap, MapContainer, TileLayer, Marker } from "react-leaflet";
import data from "./data/location_list.json";
import {
  Button,
  Box,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
  // Table header formatting
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  // Table 2
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "lastName", headerName: "Last name", width: 130 },
  ];

  const rows = [
    { id: 1, lastName: "Snow" },
    { id: 2, lastName: "Lannister" },
    { id: 3, lastName: "Lannister" },
    { id: 4, lastName: "Stark" },
    { id: 5, lastName: "Targaryen" },
    { id: 6, lastName: "Melisandre" },
    { id: 7, lastName: "Clifford" },
    { id: 8, lastName: "Frances" },
    { id: 9, lastName: "Roxie" },
  ];

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

      {/* Table */}
      <Box sx={{ width: "50%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "70%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Reroll</StyledTableCell>
                <StyledTableCell align="center">Country</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countryRecord.map((country, index) => (
                <TableRow
                  key={uuidv4()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Table2 */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          rows={rows}
          columns={columns}
          // pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Stack>
  );
}

export default App;
