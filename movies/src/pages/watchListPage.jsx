import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const WatchListPage = () => {
  const { mustWatch } = useContext(MoviesContext);

  const { data: movies, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const displayedMovies = movies.results.filter((movie) =>
    mustWatch.includes(movie.id)
  );

  return (
    <PageTemplate
      title="Watchlist"
      movies={displayedMovies}
      action={() => null}
    />
  );
};

export default WatchListPage;