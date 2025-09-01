import React from 'react';
import { MovieTileProps } from './models/movie-tile.models';
import MovieTileMenu from './components/movie-tile-menu/MovieTileMenu';

import './MovieTile.css';

const MovieTile: React.FC<MovieTileProps> = ({
  movie,
  onClick,
  onEdit,
  onDelete,
}) => {
  const handleClick = () => {
    onClick(movie);
  };

  return (
    <div className="movie-tile"
      data-testid="movie-tile"
      onClick={handleClick}>
      <div className="movie-poster-wrapper">
        <img className="movie-poster" src={movie.imageUrl} alt={movie.title} />
        {(onEdit || onDelete) && (
          <div className="movie-tile-menu">
            <MovieTileMenu 
              onEdit={onEdit ? () => onEdit(movie) : undefined}
              onDelete={onDelete ? () => onDelete(movie) : undefined}
            />
          </div>
        )}
      </div>
      <div className="movie-info">
        <div className="movie-title-row">
          <span className="movie-title" data-testid="movie-title">{movie.title}</span>
          <span className="movie-year" data-testid="movie-year">{movie.year}</span>
        </div>
        <div className="movie-genres" data-testid="movie-genres">
          {movie.genres.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default MovieTile;
