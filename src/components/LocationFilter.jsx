import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import data from "../data/location_list.json";

function LocationFilter() {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={data}
      autoHighlight
      getOptionLabel={option => option.Country}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.Code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.Code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.Country} ({option.Code})
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          country="Choose a location"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default LocationFilter;
