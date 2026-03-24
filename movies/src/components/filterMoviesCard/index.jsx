import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = [...data.genres];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  };

  const handleYearChange = (e) => {
    handleChange(e, "year", e.target.value);
  };

  const handleRatingChange = (e) => {
    handleChange(e, "rating", e.target.value);
  };

  const handleFavoritesChange = (e) => {
    handleChange(e, "favoritesOnly", e.target.checked);
  };

  const handleWatchlistChange = (e) => {
    handleChange(e, "watchlistOnly", e.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 3,
        position: "sticky",
        top: 64,
        zIndex: 1000,
        py: 1.5,
        backdropFilter: "blur(8px)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "1000px",
          maxWidth: "100%",
          px: 3,
          py: 2,
          borderRadius: 3,
        }}
      >
        <TextField
          label="Search movies"
          type="search"
          variant="outlined"
          value={props.titleFilter}
          onChange={handleTextChange}
          sx={{ width: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            value={props.genreFilter}
            label="Genre"
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 190 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={props.sortFilter}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="titleAsc">Title A-Z</MenuItem>
            <MenuItem value="titleDesc">Title Z-A</MenuItem>
            <MenuItem value="dateDesc">Release Date Newest</MenuItem>
            <MenuItem value="dateAsc">Release Date Oldest</MenuItem>
            <MenuItem value="ratingDesc">Rating High-Low</MenuItem>
            <MenuItem value="ratingAsc">Rating Low-High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Year"
          type="number"
          variant="outlined"
          value={props.yearFilter}
          onChange={handleYearChange}
          sx={{ width: 120 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="rating-label">Min Rating</InputLabel>
          <Select
            labelId="rating-label"
            value={props.ratingFilter}
            label="Min Rating"
            onChange={handleRatingChange}
          >
            <MenuItem value="0">All</MenuItem>
            <MenuItem value="5">5+</MenuItem>
            <MenuItem value="6">6+</MenuItem>
            <MenuItem value="7">7+</MenuItem>
            <MenuItem value="8">8+</MenuItem>
            <MenuItem value="9">9+</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={props.favoritesOnly}
              onChange={handleFavoritesChange}
            />
          }
          label="Favorites Only"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={props.watchlistOnly}
              onChange={handleWatchlistChange}
            />
          }
          label="Watchlist Only"
        />
      </Paper>
    </Box>
  );
}