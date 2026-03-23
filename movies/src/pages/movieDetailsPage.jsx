import React from "react";
import { useParams } from "react-router";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits, getMovieCrew } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const MoviePage = () => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  const { data: cast } = useQuery({
    queryKey: ["credits", { id: id }],
    queryFn: () => getMovieCredits(id),
  });

  const { data: crew } = useQuery({
    queryKey: ["crew", { id: id }],
    queryFn: () => getMovieCrew(id),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} cast={cast} crew={crew} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;