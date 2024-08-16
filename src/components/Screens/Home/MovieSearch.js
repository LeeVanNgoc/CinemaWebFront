import * as React from "react";
// import material-ui
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import redux
import { useSelector } from "react-redux";

export default function MovieSearch() {
  const movies = useSelector((state) => state.manageMovies.movies.movies);
  const top100Films = movies.map((movie) => ({
    label: movie.title,
  }));
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}
