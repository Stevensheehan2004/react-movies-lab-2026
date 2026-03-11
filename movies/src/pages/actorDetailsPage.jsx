import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Spinner from "../components/spinner";
import { getActor, getActorMovieCredits } from "../api/tmdb-api";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const ActorDetailsPage = () => {
  const { id } = useParams();

  const {
    data: actor,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: () => getActor(id),
  });

  const { data: credits } = useQuery({
    queryKey: ["actorCredits", { id }],
    queryFn: () => getActorMovieCredits(id),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: "20px" }}>
        {actor.name}
      </Typography>

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={actor.name}
          style={{
            width: "300px",
            borderRadius: "10px",
          }}
        />

        <div style={{ flex: 1, minWidth: "300px" }}>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Biography
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: "20px" }}>
            {actor.biography || "No biography available."}
          </Typography>

          <Paper component="ul" sx={{ ...root }}>
            <li>
              <Chip
                label={`Born: ${actor.birthday || "Unknown"}`}
                sx={{ ...chip }}
                color="primary"
              />
            </li>
            <li>
              <Chip
                label={`Place of Birth: ${actor.place_of_birth || "Unknown"}`}
                sx={{ ...chip }}
              />
            </li>
            <li>
              <Chip
                label={`Popularity: ${actor.popularity}`}
                sx={{ ...chip }}
              />
            </li>
          </Paper>

          <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "10px" }}>
            Known For
          </Typography>

          <Paper component="ul" sx={{ ...root }}>
            {credits &&
              credits.slice(0, 10).map((movie) => (
                <li key={movie.credit_id}>
                  <Chip
                    label={`${movie.title} (${movie.character || "Unknown role"})`}
                    sx={{ ...chip }}
                  />
                </li>
              ))}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailsPage;