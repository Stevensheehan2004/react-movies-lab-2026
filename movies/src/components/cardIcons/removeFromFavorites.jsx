import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const { removeFromFavorites } = useContext(MoviesContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    removeFromFavorites(movie);
  };

  return (
    <Tooltip title="Remove from Favorites">
      <IconButton onClick={handleRemoveFromFavorites}>
        <FavoriteIcon color="error" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromFavoritesIcon;