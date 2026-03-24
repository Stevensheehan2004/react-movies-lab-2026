import React, { useState, useContext } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import { MoviesContext } from "../../contexts/moviesContext";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("none");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  const { favorites, mustWatch } = useContext(MoviesContext);
  const genreId = Number(genreFilter);
  const minRating = Number(ratingFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if (!yearFilter) return true;
      return m.release_date && m.release_date.startsWith(yearFilter);
    })
    .filter((m) => {
      return minRating > 0 ? m.vote_average >= minRating : true;
    })
    .filter((m) => {
      return favoritesOnly ? favorites.includes(m.id) : true;
    })
    .filter((m) => {
      return watchlistOnly ? mustWatch.includes(m.id) : true;
    });

  displayedMovies = [...displayedMovies].sort((a, b) => {
    switch (sortFilter) {
      case "titleAsc":
        return a.title.localeCompare(b.title);
      case "titleDesc":
        return b.title.localeCompare(a.title);
      case "dateDesc":
        return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      case "dateAsc":
        return new Date(a.release_date || 0) - new Date(b.release_date || 0);
      case "ratingDesc":
        return b.vote_average - a.vote_average;
      case "ratingAsc":
        return a.vote_average - b.vote_average;
      default:
        return 0;
    }
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "favoritesOnly") setFavoritesOnly(value);
    else if (type === "watchlistOnly") setWatchlistOnly(value);
  };

  return (
    <Grid container justifyContent="center">
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      <Grid size={12} sx={{ px: 3, pt: 2 }}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          sortFilter={sortFilter}
          yearFilter={yearFilter}
          ratingFilter={ratingFilter}
          favoritesOnly={favoritesOnly}
          watchlistOnly={watchlistOnly}
        />
      </Grid>

      <Grid size={12} sx={{ px: 3 }}>
        <Grid container justifyContent="center">
          <MovieList action={action} movies={displayedMovies} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;