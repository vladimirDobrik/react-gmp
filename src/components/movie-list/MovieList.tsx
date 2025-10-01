import React from "react";
import MovieTile from "../movie-tile/MovieTile";
import { MovieListProps } from "./models/movie-list.models";

import './MovieList.css';

const MovieList: React.FC<MovieListProps> = ({
  movies = [],
  onSelectMovie,
  onEditMovie,
  onDeleteMovie,
}) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieTile
          key={movie.id ?? movie.title}
          movie={movie}
          onClick={onSelectMovie || (() => {})}
          onEdit={(m) => onEditMovie?.(m)}
          onDelete={(m) => onDeleteMovie?.(m)}
        />
      ))}
    </div>
  );
};

export default MovieList;
