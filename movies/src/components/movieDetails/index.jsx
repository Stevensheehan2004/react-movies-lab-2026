import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const MovieDetails = ({ movie, cast, crew }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Actors</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {cast &&
              cast.slice(0, 8).map((actor) => (
                <div
                  key={actor.id}
                  style={{
                    width: "150px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={actor.name}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/actors/${actor.id}`)}
                  />

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      margin: "8px 0 4px 0",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/actors/${actor.id}`)}
                  >
                    {actor.name}
                  </Typography>

                  <Typography sx={{ fontSize: "0.9rem", margin: 0 }}>
                    {actor.character}
                  </Typography>
                </div>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Crew</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Paper component="ul" sx={{ ...root }}>
            {crew &&
              crew.slice(0, 25).map((person, index) => (
                <li key={`${person.id}-${person.job}-${index}`}>
                  <Chip
                    label={`${person.name} - ${person.job}`}
                    sx={{ ...chip }}
                  />
                </li>
              ))}
          </Paper>
        </AccordionDetails>
      </Accordion>

      <Fab
        color="primary"
        variant="extended"
        onClick={() => navigate(`/movies/${movie.id}/recommendations`)}
        sx={{
          position: "fixed",
          bottom: "5em",
          right: "1em",
        }}
      >
        Recommendations
      </Fab>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
