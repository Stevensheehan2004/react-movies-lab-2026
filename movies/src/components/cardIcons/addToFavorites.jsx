import React, { useContext, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToFavoritesIcon = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(MoviesContext);

  const [open, setOpen] = useState(false);

  const isFavorite = favorites.includes(movie.id);

  const handleClick = (e) => {
    e.preventDefault();

    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }

    setOpen(true);
  };

  return (
    <>
      <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
        <IconButton onClick={handleClick}>
          {isFavorite ? (
            <FavoriteIcon color="error" fontSize="large" />
          ) : (
            <FavoriteBorderIcon color="primary" fontSize="large" />
          )}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          {isFavorite ? "Removed from Favorites" : "Added to Favorites"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToFavoritesIcon;