import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";

function createData(reroll, location) {
  return { reroll, location };
}

// const rows = [
//   createData(1, "Japan"),
//   createData(2, "Spain"),
//   createData(3, "Ireland"),
// ];

function TablePlaceHolder() {
  const [rows, setRows] = useState([]);

  function handleRows() {
    setRows([createData(1, "Japan")]);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reroll</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={uuidv4()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.reroll}
                </TableCell>
                <TableCell>{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Test Button for updating table*/}
      <Button onClick={handleRows} color="error" variant="contained">
        Test Button
      </Button>
    </>
  );
}

export default TablePlaceHolder;
