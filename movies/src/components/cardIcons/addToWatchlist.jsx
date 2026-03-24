import React, { useContext, useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToWatchListIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch, removeFromMustWatch } =
    useContext(MoviesContext);

  const [open, setOpen] = useState(false);

  const isWatchlist = mustWatch.includes(movie.id);

  const handleClick = (e) => {
    e.preventDefault();

    if (isWatchlist) {
      removeFromMustWatch(movie);
    } else {
      addToMustWatch(movie);
    }

    setOpen(true);
  };

  return (
    <>
      <Tooltip title={isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
        <IconButton onClick={handleClick}>
          {isWatchlist ? (
            <PlaylistRemoveIcon color="primary" fontSize="large" />
          ) : (
            <PlaylistAddIcon color="primary" fontSize="large" />
          )}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          {isWatchlist ? "Removed from Watchlist" : "Added to Watchlist"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToWatchListIcon;