import React, { useState } from "react";
import { getPopularActors } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";

const ActorsPage = () => {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("popularityDesc");
  const navigate = useNavigate();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popularActors", page],
    queryFn: () => getPopularActors(page),
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  let actors = data.results.filter((actor) =>
    actor.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  actors = [...actors].sort((a, b) => {
    switch (sortFilter) {
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "popularityAsc":
        return a.popularity - b.popularity;
      case "popularityDesc":
      default:
        return b.popularity - a.popularity;
    }
  });

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Popular Actors
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            width: "600px",
            maxWidth: "100%",
            justifyContent: "center",
            px: 3,
            py: 2,
            borderRadius: 3,
          }}
        >
          <TextField
            label="Search actors"
            type="search"
            variant="outlined"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            sx={{ width: 260 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="actor-sort-label">Sort By</InputLabel>
            <Select
              labelId="actor-sort-label"
              value={sortFilter}
              label="Sort By"
              onChange={(e) => setSortFilter(e.target.value)}
            >
              <MenuItem value="popularityDesc">Popularity High-Low</MenuItem>
              <MenuItem value="popularityAsc">Popularity Low-High</MenuItem>
              <MenuItem value="nameAsc">Name A-Z</MenuItem>
              <MenuItem value="nameDesc">Name Z-A</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {actors.map((actor) => (
          <Grid key={actor.id}>
            <Card
              sx={{
                width: 220,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "2px solid white",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
              onClick={() => navigate(`/actors/${actor.id}`)}
            >
              <CardMedia
                sx={{ height: 320 }}
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {actor.name}
                </Typography>

                <Typography variant="body2">
                  Popularity: {actor.popularity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ alignItems: "center", my: 4 }}>
        <Pagination
          count={data.total_pages > 500 ? 500 : data.total_pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default ActorsPage;
