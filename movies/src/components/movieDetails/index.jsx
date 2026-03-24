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
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

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
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, py: 2 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: "bold" }}>
          Overview
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {movie.overview}
        </Typography>
      </Paper>

      <Paper elevation={4} sx={{ p: 2, borderRadius: 3, mb: 3 }}>
        <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: "bold" }}>
          Movie Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Paper component="ul" sx={{ ...root, boxShadow: "none" }}>
          <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={{ ...chip }} />
          <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
            sx={{ ...chip }}
          />
          <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count})`}
            sx={{ ...chip }}
          />
          <Chip label={`Released: ${movie.release_date}`} sx={{ ...chip }} />
        </Paper>

        <Paper component="ul" sx={{ ...root, boxShadow: "none", mt: 1 }}>
          <li>
            <Chip label="Genres" sx={{ ...chip }} color="primary" />
          </li>
          {movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{ ...chip }} />
            </li>
          ))}
        </Paper>
      </Paper>

      <Accordion sx={{ mb: 2, borderRadius: 3, overflow: "hidden" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Actors
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              py: 1,
            }}
          >
            {cast &&
              cast.slice(0, 8).map((actor) => (
                <Box
                  key={actor.id}
                  sx={{
                    width: "150px",
                    textAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={actor.name}
                    sx={{
                      width: "100%",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/actors/${actor.id}`)}
                  />

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      mt: 1,
                      mb: 0.5,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/actors/${actor.id}`)}
                  >
                    {actor.name}
                  </Typography>

                  <Typography variant="body2">{actor.character}</Typography>
                </Box>
              ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Crew
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Divider sx={{ mb: 2 }} />
          <Paper component="ul" sx={{ ...root, boxShadow: "none" }}>
            {crew &&
              crew.slice(0, 25).map((person, index) => (
                <li key={`${person.id}-${person.job}-${index}`}>
                  <Chip label={`${person.name} - ${person.job}`} sx={{ ...chip }} />
                </li>
              ))}
          </Paper>
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 2,
        }}
      >
        <Fab
          color="primary"
          variant="extended"
          onClick={() => navigate(`/movies/${movie.id}/recommendations`)}
        >
          Recommendations
        </Fab>

        <Fab
          color="secondary"
          variant="extended"
          onClick={() => setDrawerOpen(true)}
        >
          <NavigationIcon />
          Reviews
        </Fab>
      </Box>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </Box>
  );
};

export default MovieDetails;