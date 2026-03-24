import React, { useContext } from "react";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchListIcon = ({ movie }) => {
  const { removeFromMustWatch } = useContext(MoviesContext);

  const handleRemoveFromWatchList = (e) => {
    e.preventDefault();
    removeFromMustWatch(movie);
  };

  return (
    <Tooltip title="Remove from Watchlist">
      <IconButton onClick={handleRemoveFromWatchList}>
        <PlaylistRemoveIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromWatchListIcon;