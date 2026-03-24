import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router";
import Avatar from "@mui/material/Avatar";

export default function MovieCard({ movie, action }) {
  const { favorites, mustWatch } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);
  const isWatchlist = mustWatch.includes(movie.id);

  movie.favorite = isFavorite;
  movie.mustWatch = isWatchlist;

 let borderColor = "2px solid rgba(255,255,255,0.3)";

  if (isFavorite && isWatchlist) {
    borderColor = "3px solid purple";
  } else if (isFavorite) {
    borderColor = "3px solid red";
  } else if (isWatchlist) {
    borderColor = "3px solid blue";
  }

  return (
    <Card
      sx={{
        border: borderColor,
        borderRadius: "10px",
        height: "100%",             
        display: "flex",            
        flexDirection: "column",    
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 8,
        },
      }}
    >
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : movie.mustWatch ? (
            <Avatar sx={{ backgroundColor: "blue" }}>W</Avatar>
          ) : null
        }
        title={
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,      
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 400 }} 
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1">
              <StarRateIcon fontSize="small" />
              {"  "}
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing sx={{ mt: "auto" }}> 
        {action(movie)}

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}