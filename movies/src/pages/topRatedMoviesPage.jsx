import React, { useState } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TopRatedMoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["topRated", page],
    queryFn: () => getTopRatedMovies(page),
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />

      <Stack spacing={2} sx={{ alignItems: "center", my: 3 }}>
        <Pagination
          count={data.total_pages > 500 ? 500 : data.total_pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </>
  );
};

export default TopRatedMoviesPage;